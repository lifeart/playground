function userApp() {

	var self = this;
	this.ids = {};
	this.uri = {};
	this.dom = {};
	this.classes = {};
	this.loadFlags = {};
	this.dom.pages = {};
	
	this.loadFlags.social = false;
	this.loadFlags.yAnalitycs = false;
	this.loadFlags.gAnalitycs = false;
	this.loadFlags.pages = {};
	this.totalPagesLoaded = 0;
	this.newsPerPage = 4;
	this.loadInterval = false;
	
	this.connection = ('https:' == window.location.protocol ? 'https:' : 'http:');
	this.uri.social = '//share.pluso.ru/pluso-like.js';
	this.uri.yandex = '//mc.yandex.ru/metrika/watch.js';
	this.uri.google = '//www.google-analytics.com/analytics.js';
	this.dom.social = document.getElementById('socialButtons');
	
	this.classes.page = 'app_page';
	this.ids.page = 'page_';
	this.firstPage = 1;
	this.pageCount = 5;
	
	this.getPages = function() {
		for (i=this.firstPage;i<=this.pageCount;i++) {
			this.dom.pages[i] = document.getElementById(this.ids.page+i);
			this.loadFlags.pages[i] = false;
		}
	}
	
	this.content = {};
	this.content.imgs = ['http://s30.postimg.org/a9oyqzur1/101_2003.jpg','http://s30.postimg.org/qyv00ngq5/2008.jpg','http://s30.postimg.org/6g03vl2st/dopingirls_2007_2.jpg','http://s7.postimg.org/52le267nb/dopingirls_2007.jpg','http://s7.postimg.org/4r3xper7b/dopingirls_2007_1.jpg','http://s7.postimg.org/9i3t7fk1j/image.jpg','http://s7.postimg.org/42v36gshj/2008.jpg','http://s7.postimg.org/lu6pkx7w7/goldiegirl_1998_2004_1.jpg','http://s7.postimg.org/rjmy58e2f/goldiebo.jpg','http://s8.postimg.org/4erv2r7a9/cd_messer_chups_bermuda_66_20.jpg','http://s8.postimg.org/m63hh7mox/1999.jpg','http://s8.postimg.org/i5wc4yw81/1_2010.jpg','http://s8.postimg.org/hql2byaap/2_2010.jpg','http://s8.postimg.org/d8irjuu8x/2013.jpg','http://s8.postimg.org/8wu5uunc1/2014.jpg','http://s8.postimg.org/eemrinijl/2007.jpg','http://s8.postimg.org/n0q138ujl/2012.jpg','http://s8.postimg.org/7dyrpvgrl/2013.jpg','http://s8.postimg.org/9b0386wtd/cd_future_sound_of_russia_2008.jpg','http://s8.postimg.org/5kvv1jvkx/image.jpg','http://s8.postimg.org/xc6z9nbmp/image.jpg','http://s8.postimg.org/b1j49oech/2014.jpg'];
	this.content.texts = ['Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo','Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.','Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.','Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?','Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?','But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.','No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.','Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.','To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.','Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.','Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.','On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.','These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.','But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.','The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.'];
	
	
	this.set5pgs = function() {
		var height = window.innerHeight;
		if (height<this.newsPerPage*150) height = this.newsPerPage*150;
		if (height>1000) this.newsPerPage = Math.ceil(height/150);
		if (height<500) this.newsPerPage = 2;
		$('.'+this.classes.page).css('min-height',height+'px');
	}
	
	this.loadSocial = function() {
		if (this.loadFlags.social) return;
		if (window.pluso) if (typeof window.pluso.start == "function") return;
		$.getScript(this.connection+this.uri.social, (function(app) {
			app.dom.social.innerHTML = '';
			if (window.ifpluso==undefined) {
				window.ifpluso = 1;
			}
		})(this));
	}
	
	this.loadGoogleAnalitycs = function() {
		if(this.loadFlags.gAnalitycs) return;
		var r = 'ga';
		window['GoogleAnalyticsObject']=r;
		window[r]=window[r]||function(){
			(window[r].q=window[r].q||[]).push(arguments)
		},
		window[r].l=1*new Date();
	
		$.getScript(this.connection+this.uri.google, (function(app) {
			ga('create', 'UA-8984858-4', 'dmlabs.org');
			ga('send', 'pageview');
			app.loadFlags.gAnalitycs =  true;
		})(this));
	}
	
	this.loadYandexAnalitycs = function() {
		if(this.loadFlags.yAnalitycs) return;
		(window['yandex_metrika_callbacks'] = window['yandex_metrika_callbacks'] || []).push(function() {
			try {
				window.yaCounter23157301 = new Ya.Metrika(
				{
					id:23157301,
					clickmap:true,
					trackLinks:true,
					accurateTrackBounce:true
				});
			} catch(e) { }
		});
		
		$.getScript(this.connection+this.uri.yandex, (function(app) {
			app.loadFlags.yAnalitycs =  true;
		})(this));
		
	}
	
	this.isVisible = function (elem) {

		var win = $(window);
		var viewport = {
			top : win.scrollTop(),
			left : win.scrollLeft()
		};
		viewport.right = viewport.left + win.width();
		viewport.bottom = viewport.top + win.height();
	 
		var item = $(elem);
		var bounds = item.offset();
		bounds.right = bounds.left + item.outerWidth();
		bounds.bottom = bounds.top + item.outerHeight();
	 
		return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));	

	}	
	
	this.loadAnalytics = function() {
		this.loadGoogleAnalitycs();
		this.loadYandexAnalitycs();
	}
	
	this.loadScripts = function() {
		setTimeout(function(){self.loadSocial();},10000);
		this.loadAnalytics();
	}
	
	
	this.getRandEl = function(array) {
		return array[Math.floor(Math.random()*array.length)];
	}

	this.loadPageContent = function(number) {
		if (this.loadFlags.pages[number]) return;
		this.loadFlags.pages[number] = true;
		console.log('page '+number+' loaded');
		this.totalPagesLoaded++;
		switch (number) {
		  case 1: console.log('first_page_loaded'); break;
		  case 5: console.log('last_page_loaded'); break;
		  default: this.fillPage(number); break;			
		}
	}
	
	this.contentTemplate = function(image,text) {
		return '<div class="media app_page_content"><img class="pull-left media-object img-thumbnail app_content_image" src="'+image+'" alt="example img"><div class="media-body"><p>'+text+'</p></div></div>';
	}
	
	this.fillPage = function (number,up) {
		up = typeof up !== 'undefined' ? up : false;
		var content = '';
		this.loadFlags.pages[number] = true;
		var text = '';
		for (i=0;i<5;i++) text += this.getRandEl(this.content.texts);
		for (i=0;i<this.newsPerPage;i++) content += this.contentTemplate(this.getRandEl(this.content.imgs),text);
		if (up == false) this.dom.pages[number].innerHTML = this.dom.pages[number].innerHTML+content;
		else this.dom.pages[number].innerHTML = content+this.dom.pages[number].innerHTML;
	}
	
	this.loadPagesByVisiblity = function () {
		for(i=this.firstPage;i<=this.pageCount;i++) {
			if (this.loadFlags.pages[i] == false) {
				if (this.isVisible(this.dom.pages[i])) {
					this.loadPageContent(i);
				}
			}
		}
	}
	
	this.loadAnyPage = function () {
		if (this.totalPagesLoaded >= this.pageCount) clearInterval(self.loadInterval);
		for(i=this.firstPage;i<=this.pageCount;i++) {
			if (!this.loadFlags.pages[i]) {
				this.loadPageContent(i);
				return;
			}
		}
	}
	
	this.loadPages = function() {
		this.loadInterval = setInterval(function() {self.loadAnyPage();},2500);
	}
	
	this.run = function() {
	
		$('#app_menu>li').click(function(){
			$('#app_menu>li').removeClass('active');
			$(this).addClass('active');
		});
		
		$(window).resize(function(){
			self.set5pgs();
		});
		
		$(window).scroll(function() {
			console.log('scroll');
			clearTimeout($.data(this, 'scrollTimer'));
			$.data(this, 'scrollTimer', setTimeout(function() {
				self.loadPagesByVisiblity();
			}, 100));
		});
		
		$(self.dom.social).hover(function(){
			if (!self.loadFlags.social) {
				if (self.isVisible(self.dom.social)) {
					self.loadSocial();
				}
			}
			return false;
		});
	
		this.set5pgs();
		this.getPages();
		
		this.loadScripts();
		this.loadPages();
	}
}