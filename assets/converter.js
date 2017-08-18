var elementExists = document.getElementById("transliterateDiv");
if(elementExists!=null){
 google.load("elements", "1", {
            packages: "transliteration"
          });
      function onLoad() {
        var options = {
            sourceLanguage:
                google.elements.transliteration.LanguageCode.ENGLISH,
            destinationLanguage:
                [google.elements.transliteration.LanguageCode.HINDI],
            shortcutKey: 'ctrl+g',
            transliterationEnabled: true
        };
 
        var control =
            new google.elements.transliteration.TransliterationControl(options);
 
        // Enable transliteration in the editable elements with id
        // 'transliterateDiv'.
        control.makeTransliteratable(['transliterateDiv']);
          }
      google.setOnLoadCallback(onLoad);
} 
function validateForm() {
    var x = document.forms["myform"]["name"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
}
jQuery(document).ready(function(){
	  
	  $ym = jQuery('#transliterateDiv');
	  if($ym.length>0){
	
	  }

	
	
	
	$ys = jQuery('.your-story');
	$n = jQuery('.name');
	$m = jQuery('.mobile');
	$w = jQuery('.whatsapp');
	$c = jQuery('.contentstory');
	$message = jQuery('span.message');
	
	
	$ys.submit(function(e){
		$requestvar = {};
		$requestvar.action='send-email';
		$requestvar.info = {};
		$requestvar.info.to = 'kayass.deltabee@gmail.com';
		$requestvar.info.subject = 'My Story @ kayass';
		$requestvar.info.name = $n.val();
		$requestvar.info.mobile = $m.val();
		$requestvar.info.whatsapp = $w.val();
		$requestvar.info.content = $c.val();
		e.preventDefault();
		if($m.val().length<10 || $m.val().length>10)
		{
		 $message.addClass('error').html('*Mobile No must be of 10 digit.');
		 setTimeout(function(){
			 $message.fadeOut('slow');
		 },5000);
		 
		 return false;	
		}
		if($w.val().length<10 || $w.val().length>10)
		{
		 $message.addClass('error').html('*Whatsapp No must be of 10 digit.');	
		 setTimeout(function(){
			 $message.fadeOut('slow');
		 },5000);
		 return false;	
		}
		jQuery.getJSON('http://yaal2.technofox.co.in/api/send_email_hindi?callback=?',{request:$requestvar},function(data){
			if(data.status==0)
			{
				$message.addClass('error').html(data.message);
			}
			else
			{	$n.val('');
				$m.val('');
				$w.val('');
				$c.val('');
				$message.addClass('success').html(data.message);
			}
		});
		
		callbackForResponse = function(data){
			console.log(data);
		};
	});
});