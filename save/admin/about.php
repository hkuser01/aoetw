<?php
/**
 * Model: C.P.Sub 公告系統
 * Author: Cooltey Feng
 * Lastest Update: 2014/6/9
 */
	
	// get json information
	$aboutData	= json_decode(file_get_contents($config_about_author));
	$label_color = array("default", "primary", "info", "danger", "success");
?>
	<div class="jumbotron">
	  <div class="container">
		<h3>Aoetw記錄檔上傳區，使用規範</h3>
		<ul>
			<li>這邊是記錄檔上傳區，如果要討論戰術內容或是勘誤請到<a href="http://aoetw.com/talk.php">討論區</a>。</li>
			<li>版本請確實填寫在標題或內文，如HD或是Voobly。</li>
			<li>請勿離題與引發爭議和違反中華民國法律，爭議文章將以予刪除不另通知。</li>
			<li><a href="http://aoetw.com/save/manage.php?p=article_add">點選發表記錄檔</a></li>
		</ul>
	  </div>
	</div>