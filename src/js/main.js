

$(document).on('ready', function() {
  console.log('sanity check');
  // var options = { $AutoPlay: true };
  // var jssor_slider1 = new $JssorSlider$('slider1_container', options);

  $('#billing-same').on('click',function() {
    var firstName = $("#firstNameShipping").val();
    var firstNameBilling = $("#firstNameBilling").val(firstName);

    var lastName = $("#lastNameShipping").val();
    var lastNameBilling = $("#lastNameBilling").val(lastName);

    var company =$('#companyShip').val();
    var companyBill=$('#companyBill').val(company);

    var address1=$('#address1Ship').val();
    var address1Bill=$('#address1Bill').val(address1);

    var address2=$('#address2Ship').val();
    var address2Bill=$('#address2Bill').val(address2);

    var stateShip = $('#stateShip').val();
    var stateBill = $('#stateBill').val(stateShip);

    var zip = $('#zipShip').val();
    var zipBill = $('#zipBill').val(zip);
  });


//button hover functionality

  var $btns = $('.hover');
  $btns.hide();

  $('.thumbnail').hover(function() {

    $(this).find($btns).show(500);
    // console.log($(this).children());
    // $('div').css('position', 'relative');
    $('.btnContainer').css({top: '160px', left: '88px', opacity: '.8', position:'absolute'});
    // console.log('works!');
  },
  function(){
      $(this).find($btns).hide(500);
  });
//end button hover functionality

//email validation

  $('form').on('submit', function(){
    event.preventDefault();
    var $email = $('input[name="email"]');
    if(validateEmail($email.val())){
      $email.val('');
      $('p').remove();
      $('.well-lg').append('<p class="sucka">Thanks, Sucka! You shall now receive Spam!</p>');
      $email.removeClass('invalidEmail');
    } else {
      $('p').remove();
      $email.addClass('invalidEmail');
      $('.well-lg').append('<p class="sucka">Bark, bark bark bark, bark, bark.<br><br>Oh no! Our user needs help entering a valid email address! Thanks, Lassie, you\'re the best.</p>');
    }
  });

  function validateEmail (str) {
    var emailPatten = /^([\w\.\-\+_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm;
    return emailPatten.test(str);
  }
//Checkout Form validations
   ['firstNameShipping', 'lastNameShipping','address1Ship', 'firstNameBilling', 'lastNameBilling','address1Bill','zipShip','zipBill'].forEach(function (inputName) {
  var $input = $("input[name='" + inputName + "']");
   $input.on('blur', function() {
    // event.preventDefault();
      var val = $input.val();
      if (!val) {
        $input.addClass('warning');
      } else {
        $input.removeClass('warning');
      }
    });
  });

   ['zipShip','zipBill'].forEach(function (inputName) {
  var $input = $("input[name='" + inputName + "']");
   $input.on('blur', function() {
    // event.preventDefault();
      var val = $input.val();
      if (!val) {
        $input.addClass('warning');
      } else if
        (($input.length)< 5 || (zip.length)>5 ) {
          $input.addClass('warning');
        errorMessage = "*zipcode should only be 5 digits";
      }
      else {
        $input.removeClass('warning');
      }
    });
  });

   ['address2Ship','address2Bill'].forEach(function (inputName) {
    var $input = $("input[name='" + inputName + "']");
    var test = $('input[name="address1Ship"]');
      $input.on('focus', function() {
       if (!test.val()) {
        $input.addClass('warning');
      } else {
        $input.removeClass('warning');
      }
    });
  });
   // ['stateShip', 'stateBill'].forEach(function(inputName) {
   //  var $input = $("select[name='" + inputName + "']");
   //  $input.on('blur', function() {
   //  if ($input.val"n/a") {
   //      $input.addClass('warning');
   //    } else {
   //      $input.removeClass('warning');
   //    }
   //  });
   // });

// function validate()
// {
//    if(document.getElementById("ddlList").value == "")
//    {
//       alert("Please select value"); // prompt user
//       document.getElementById("ddlList").focus(); //set focus back to control
//       return false;
//    }
// }

//end email validation

//Make Carousel
  var images = [
    '1200x300?text=Image%201',
    '1200x300?text=Image%202',
    '1200x300?text=Image%203',
    '1200x300?text=Image%204',
    '1200x300?text=Image%205',
  ];

  var url = 'http://placehold.it/';

  //create divs with background images using images Array above
  images.forEach(function(eachImg, index){
    fullUrl = url + eachImg;
    $imgDiv = $('<div></div>');
    $imgDiv.addClass('image');
    if(!index){
      $imgDiv.css({'background': 'url('+fullUrl+')50%', 'display': 'inline-block'});
    } else {
      $imgDiv.css({'background': 'url('+fullUrl+')50%'});
      $imgDiv.hide();
    }
    $('.carousel-images').append($imgDiv);
  });

  //create auto slider and previous/next buttons

  var currentIndex = 0;
  var items = $('.carousel-images').children();
  var itemAmt = items.length;
  var autoSlide;
  var autoSlideReverse;
  var sliderState = 1;

     slide();

  function cycleItems() {
    // console.log('cycleItems');
    var item = items.eq(currentIndex);
    items.hide();
    item.css('display','inline-block');
  }

  function slide (){
    // console.log('slide');
    autoSlide = setInterval(function() {
      currentIndex += 1;
      if (currentIndex > itemAmt - 1) {
        currentIndex = 0;
      }
      cycleItems();
    }, 3000);
  }

  function slideReverse (){
    // console.log('slideReverse');
    autoSlideReverse = setInterval(function() {
      currentIndex -= 1;
      if (currentIndex < 0) {
        currentIndex = itemAmt - 1;
      }
      cycleItems();
    }, 3000);
  }

  //Manual Forward and Backward buttons.
  $('.glyphicon-chevron-right').on('click', function() {
    clearInterval(autoSlide);
    clearInterval(autoSlideReverse);
    currentIndex += 1;
    if (currentIndex > itemAmt - 1) {
      currentIndex = 0;
    }
    cycleItems();
    slide();
  });

  $('.glyphicon-chevron-left').on('click', function() {
    clearInterval(autoSlideReverse);
    clearInterval(autoSlide);
    currentIndex -= 1;
    if (currentIndex < 0) {
      currentIndex = itemAmt - 1;
    }
    cycleItems();
    slideReverse();
  });

  //Add Pause/Play/Forward/Backwards functionality
  $('.glyphicon-play').hide();
  $('.glyphicon-pause').hide();
  $('.glyphicon-forward').hide();
  $('.glyphicon-backward').hide();

  var PlayState = 1;
  // console.log(PlayState);

  //On Hover Actions

  $('.image, .backward, .forward, .play-pause').hover(function(){
    if(PlayState){
          // console.log(PlayState);
      $('.glyphicon-pause').show();
      $('.glyphicon-forward').show();
      $('.glyphicon-backward').show();
    } else {
      $('.glyphicon-play').show();
      $('.glyphicon-forward').show();
      $('.glyphicon-backward').show();
    }
  },
    function(){
      $('.glyphicon-pause').hide();
      $('.glyphicon-play').hide();
      $('.glyphicon-forward').hide();
      $('.glyphicon-backward').hide();
  });

  //Click Play/Pause Button
  $('.image, .play-pause').on('click', function(){
    if(PlayState){
      clearInterval(autoSlide);
      clearInterval(autoSlideReverse);
      PlayState = 0;
      // console.log(PlayState);
      $('.glyphicon-pause').hide();
      $('.glyphicon-play').show();
      $('.glyphicon-forward').show();
      $('.glyphicon-backward').show();
    } else {
        clearInterval(autoSlide);
        clearInterval(autoSlideReverse);
        slide();
        PlayState = 1;
        // console.log(PlayState);
        $('.glyphicon-play').hide();
        $('.glyphicon-pause').show();
        $('.glyphicon-forward').show();
        $('.glyphicon-backward').show();
    }
  });

  //Click Forward button to go forward
  $('.forward').on('click', function(){
    clearInterval(autoSlideReverse);
    clearInterval(autoSlide);
    slide();
  });

  //click Reverse Button to go backwards.
  $('.backward').on('click', function(){
    clearInterval(autoSlideReverse);
    clearInterval(autoSlide);
    slideReverse();
  });

// End Carousel


});



