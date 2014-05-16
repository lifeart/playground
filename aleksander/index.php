<?php

$f3=require('lib/base.php');

$f3->set('UPLOADS','uploads/'); 

define('TABLE_NAME','Records');

if ((float)PCRE_VERSION<7.9)
	trigger_error('PCRE version is out of date');

$f3->config('config.ini');


$f3->db=new DB\SQL(
    'mysql:host=localhost;port=3306;dbname=alex_t',
    'alex_t',
    'dtULM2W3hyRC7r3w'
);

$f3->web = \Web::instance();

$f3->route('GET /test',
	function($f3,$params) {
		echo View::instance()->render('test.htm');
	}
);

$f3->route('GET /test/records',
	function($f3,$params) {
		$start = $f3->get('GET.start');
		$limit = $f3->get('GET.limit');
		$total = $f3->db->exec("SELECT COUNT(*) as total FROM ".TABLE_NAME);
		$data = $f3->db->exec("SELECT * FROM ".TABLE_NAME." WHERE 1 ORDER BY ID DESC limit {$start},{$limit}");
		$resp = array('total'=>(int)$total[0]['total'],'success'=>true,'Message'=>"Loaded data",'data'=>$data);
		echo json_encode($resp);
	} 
);

$f3->route('PUT /test/records',
	function($f3,$params) {
		$data = json_decode($f3->get('BODY'),true);
		if ($data) {
			if (!$data['ID']) return;
			$data['ID'] = abs(intval($data['ID']));
			$data['Name'] = $f3->scrub($data['Name']);
			$data['Message'] = $f3->scrub($data['Message']);
			$data['TheDate'] = date("Y-m-d",strtotime(str_replace('-', '/', $data['TheDate'])));
			$Record = array('Name'=>$data['Name'],'Message'=>$data['Message'],'TheDate'=>$data['TheDate']);
			$f3->db->begin();
			$f3->db->exec('UPDATE '.TABLE_NAME." SET Name='{$data['Name']}',Message='{$data['Message']}',TheDate='{$data['TheDate']}' WHERE ID = {$data['ID']}");
			$f3->db->commit();
			$result = array('data'=>$data,'success'=>true);
			echo json_encode($result);
		} else echo json_encode(array('success'=>false));
		
});

$f3->route('POST /test/records',
	function($f3,$params) {
		$data = json_decode($f3->get('BODY'),true);
		if ($data) {
			$data['Name'] = $f3->scrub($data['Name']);
			$data['Message'] = $f3->scrub($data['Message']);
			$data['TheDate'] = date("Y-m-d",strtotime(str_replace('-', '/', $data['TheDate'])));
			$Record = array('Name'=>$data['Name'],'Message'=>$data['Message'],'TheDate'=>$data['TheDate']);
			$f3->db->begin();
			$f3->db->exec('INSERT INTO '.TABLE_NAME." (Name,Message,TheDate) VALUES ('{$data['Name']}','{$data['Message']}','{$data['TheDate']}')");
			$id = $f3->db->lastInsertId();
			$f3->db->commit();
			$data['ID'] = $id;
			$result = array('data'=>$data,'success'=>true);
			echo json_encode($result);
		} else echo json_encode(array('success'=>false));
		
});

$f3->route('DELETE /test/records',
	function($f3,$params) {
		$data = json_decode($f3->get('BODY'),true);
		if ($data) {
			if (!$data['ID']) return;
			$data['ID'] = abs(intval($data['ID']));
			$f3->db->begin();
			$f3->db->exec('DELETE FROM '.TABLE_NAME." WHERE ID = {$data['ID']}");
			$f3->db->commit();
			$result = array('success'=>true);
			$fname = $id.'_file_'.'.jpg';
			$pname = 'preview_'.$id.'_file_'.'.jpg';
			$dirname = $f3->get('UPLOADS');
			if (file_exists($dirname.$fname))
				unlink($dirname.$fname);
			if (file_exists($dirname.$pname))
				unlink($dirname.$pname);
			
			echo json_encode($result);
		} else echo json_encode(array('success'=>false));
		
});


$f3->route('POST /fileUpload',
	function($f3,$params) {

		$overwrite = true;
		$slug = true;

		$file = $f3->get('FILES.photo');
		$files = $f3->web->receive(function($file){
				if($file['size'] > (20 * 1024 * 1024))
					return false;
				return true;
			},
			$overwrite,
			$slug
		);
		
		if (count($files) && $files[key($files)] == true) {
			$id = abs(intval($f3->get('POST.item_id')));
			$fname = $id.'_file_'.'.jpg';
			$pname = 'preview_'.$fname;
			$dirname = $f3->get('UPLOADS');
			if (file_exists($dirname.$fname))
				unlink($dirname.$fname);
			if (file_exists($dirname.$pname))
				unlink($dirname.$pname);
			$img = new Image(key($files));
			$result = $img->dump();
			imagejpeg(imagecreatefromstring($result),$dirname.$fname);
			$img->resize(90,90,false);
			$result = $img->dump();
			imagejpeg(imagecreatefromstring($result),$dirname.$pname);
			
			$f3->db->begin();
			$f3->db->exec('UPDATE '.TABLE_NAME." SET PhotoName='{$fname}',SmallPhotoName='{$pname}' WHERE ID = {$id}");
			$f3->db->commit();
			
			if (file_exists(key($files)))
				unlink(key($files));
			
			echo json_encode(array('success'=>true));
		} else echo json_encode(array('success'=>false));
	}
	
);

$f3->run();