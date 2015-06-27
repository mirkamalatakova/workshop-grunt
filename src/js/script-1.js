(function(window, document, undefined) {
  'use strict';
  
  var isHappy = true;
  var message = 'Grumpy Cat is ';

  if (isHappy == true) {
    message += 'happy!';
  }
  else message += 'sad!';
  
  $(document).ready(function() {
    $('.message').text(mesage);
  });

})(window, document);