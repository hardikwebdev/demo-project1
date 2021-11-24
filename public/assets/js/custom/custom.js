$(document).ready(function () {
  $('.onloadformsubmit').submit()
  $('.dashboard-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button class="slide-arrow prev-arrow"><img src="' + arrow + '" alt=""></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><img src="' + arrow + '" alt=""></button>'
  });

  $('.stacking-slider').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<button class="slide-arrow prev-arrow"><img src="' + arrow + '" alt=""></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><img src="' + arrow + '" alt=""></button>',
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },

    ]
  });

  $('.collection-slider').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: '<button class="slide-arrow prev-arrow"><img src="' + arrow + '" alt=""></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><img src="' + arrow + '" alt=""></button>',
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });

  $('.bull-kong-slider').slick({
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: '<button class="slide-arrow prev-arrow"><img src="' + arrow + '" alt=""></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><img src="' + arrow + '" alt=""></button>',
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },

    ]
  });


  $("#datepicker1").datepicker({ dateFormat: 'dd-mm-yy', maxDate: 0 });
  $("#datepicker2").datepicker({ dateFormat: 'dd-mm-yy', maxDate: 0 });
  $("#datepicker3").datepicker({ dateFormat: 'dd-mm-yy', maxDate: 0 });
  $("#datepicker4").datepicker({ dateFormat: 'dd-mm-yy', maxDate: 0 });
  $("#datepicker5").datepicker({ dateFormat: 'dd-mm-yy', maxDate: 0 });
  $("#datepicker6").datepicker({ dateFormat: 'dd-mm-yy', maxDate: 0 });
  $("#datepicker7").datepicker({ dateFormat: 'dd-mm-yy', maxDate: 0 });
  $("#datepicker8").datepicker({ dateFormat: 'dd-mm-yy', maxDate: 0 });

});


$(document).on('click', '.second-ajax-pag .pagination a', function (event) {
  event.preventDefault();

  $('.datas').append('<div class="cus-spinner-full"><div class="sk-spinner sk-spinner-three-bounce"><div class="sk-bounce1"></div><div class="sk-bounce2"></div><div class="sk-bounce3"></div></div></div>');
  $(this).parent('li').removeClass('active');
  $(this).parent('li').addClass('active');
  var myurl = $(this).attr('href');
  var page = $(this).attr('href').split('page=')[1];
  $.ajax(
    {
      url: '?page=' + page,
      type: "get",
      datatype: "html",
      data: {
        // htype: htype,
      },
    }).done(function (data) {
      $(".table-history").empty().html(data);
      location.hash = page;
    }).fail(function (jqXHR, ajaxOptions, thrownError) {
      alert('No response from server');
      $('.cus-spinner-full').hide(200);
    });
});

function getData(page, htype = 0) {
  $.ajax(
    {
      url: '?page=' + page,
      type: "get",
      datatype: "html",
      data: {
        htype: htype,
      },
    }).done(function (data) {
      $(".table-history").empty().html(data);
      location.hash = page;
    }).fail(function (jqXHR, ajaxOptions, thrownError) {
      alert('No response from server');
      $('.cus-spinner-full').hide(200);
    });
}





//for Ledger


$(document).on('click', '.second-ajax-report .pagination a', function (event) {
  event.preventDefault();
  $('.datas').append('<div class="cus-spinner-full"><div class="sk-spinner sk-spinner-three-bounce"><div class="sk-bounce1"></div><div class="sk-bounce2"></div><div class="sk-bounce3"></div></div></div>');
  $(this).parent('li').removeClass('active');
  $(this).parent('li').addClass('active');
  var myurl = $(this).attr('href');
  var page = $(this).attr('href').split('page=')[1];
  var htype = $('ul#ledgerreport').find('li > a.active').attr('data-type');
  $.ajax(
    {
      url: '?page=' + page,
      type: "get",
      datatype: "html",
      data: {
        htype: htype,
      },
    }).done(function (data) {
      $(".table-history").empty().html(data);
      location.hash = page;
    }).fail(function (jqXHR, ajaxOptions, thrownError) {
      alert('No response from server');
      $('.cus-spinner-full').hide(200);
    });
});
$(document).on('click', '.stackingpool-second-ajax-report .pagination a', function (event) {
  event.preventDefault();
  $('.datas').append('<div class="cus-spinner-full"><div class="sk-spinner sk-spinner-three-bounce"><div class="sk-bounce1"></div><div class="sk-bounce2"></div><div class="sk-bounce3"></div></div></div>');
  $(this).parent('li').removeClass('active');
  $(this).parent('li').addClass('active');
  var myurl = $(this).attr('href');
  var page = $(this).attr('href').split('page=')[1];
  var htype = $('ul#ledgerreport').find('li > a.active').attr('data-type');
  var start_date = $('#datepicker1').val();
  var end_date = $('#datepicker2').val();
  var stackingpoolpackage = $('#stackingpoolpackage').val();
  $.ajax(
    {
      url: '?page=' + page,
      type: "get",
      datatype: "html",
      cache: false,
      data: {
        htype: htype,
        start_date: start_date,
        end_date: end_date,
        stackingpoolpackage: stackingpoolpackage
      },
    }).done(function (data) {
      $(".stackingpool-table-history").empty().html(data);
      location.hash = page;
    }).fail(function (jqXHR, ajaxOptions, thrownError) {
      alert('No response from server');
      $('.cus-spinner-full').hide(200);
    });
});

$(document).on('click', '.nodes-management-second-ajax-report .pagination a', function (event) {
  event.preventDefault();
  $('.datas').append('<div class="cus-spinner-full"><div class="sk-spinner sk-spinner-three-bounce"><div class="sk-bounce1"></div><div class="sk-bounce2"></div><div class="sk-bounce3"></div></div></div>');
  $(this).parent('li').removeClass('active');
  $(this).parent('li').addClass('active');
  var myurl = $(this).attr('href');
  var page = $(this).attr('href').split('page=')[1];
  var htype = $('ul#ledgerreport').find('li > a.active').attr('data-type');
  var c_start_date = $('#datepicker3').val();
  var c_end_date = $('#datepicker4').val();
  $.ajax(
    {
      url: '?page=' + page,
      type: "get",
      datatype: "html",
      data: {
        htype: htype,
        c_start_date: c_start_date,
        c_end_date: c_end_date,
      },
    }).done(function (data) {
      $(".nodes-management-table-history").empty().html(data);
      location.hash = page;
    }).fail(function (jqXHR, ajaxOptions, thrownError) {
      alert('No response from server');
      $('.cus-spinner-full').hide(200);
    });
});
$(document).on('click', '.referral-commission-second-ajax-report .pagination a', function (event) {
  event.preventDefault();
  $('.datas').append('<div class="cus-spinner-full"><div class="sk-spinner sk-spinner-three-bounce"><div class="sk-bounce1"></div><div class="sk-bounce2"></div><div class="sk-bounce3"></div></div></div>');
  $(this).parent('li').removeClass('active');
  $(this).parent('li').addClass('active');
  var myurl = $(this).attr('href');
  var page = $(this).attr('href').split('page=')[1];
  var htype = $('ul#ledgerreport').find('li > a.active').attr('data-type');
  var start_date = $('#datepicker3').val();
  var end_date = $('#datepicker4').val();
  $.ajax(
    {
      url: '?page=' + page,
      type: "get",
      datatype: "html",
      data: {
        htype: htype,
        start_date: start_date,
        end_date: end_date,
      },
    }).done(function (data) {
      $(".referral-commission-table-history").empty().html(data);
      location.hash = page;
    }).fail(function (jqXHR, ajaxOptions, thrownError) {
      alert('No response from server');
      $('.cus-spinner-full').hide(200);
    });
});
$(document).on('click', '.model-second-ajax-report .pagination a', function (event) {
  event.preventDefault();
  $('.datas').append('<div class="cus-spinner-full"><div class="sk-spinner sk-spinner-three-bounce"><div class="sk-bounce1"></div><div class="sk-bounce2"></div><div class="sk-bounce3"></div></div></div>');
  $(this).parent('li').removeClass('active');
  $(this).parent('li').addClass('active');
  var myurl = $(this).attr('href');
  var page = $(this).attr('href').split('page=')[1];
  var htype = $('ul#ledgerreport').find('li > a.active').attr('data-type');
  $.ajax(
    {
      // url: '?page=' + page,
      url: myurl,
      type: "get",
      datatype: "html",
      data: {
        htype: htype,
      },
    }).done(function (data) {
      $(".model-table-history").empty().html(data);
      location.hash = page;
    }).fail(function (jqXHR, ajaxOptions, thrownError) {
      alert('No response from server');
      $('.cus-spinner-full').hide(200);
    });
});
$(document).on('click', '.roi-second-ajax-report .pagination a', function (event) {
  event.preventDefault();
  $('.datas').append('<div class="cus-spinner-full"><div class="sk-spinner sk-spinner-three-bounce"><div class="sk-bounce1"></div><div class="sk-bounce2"></div><div class="sk-bounce3"></div></div></div>');
  $(this).parent('li').removeClass('active');
  $(this).parent('li').addClass('active');
  var myurl = $(this).attr('href');
  var page = $(this).attr('href').split('page=')[1];
  var htype = $('ul#ledgerreport').find('li > a.active').attr('data-type');
  var start_date = $('#datepicker7').val();
  var end_date = $('#datepicker8').val();
  $.ajax(
    {
      url: '?page=' + page,
      type: "get",
      datatype: "html",
      data: {
        htype: htype,
        start_date: start_date,
        end_date: end_date,
      },
    }).done(function (data) {
      $(".roi-table-history").empty().html(data);
      location.hash = page;
    }).fail(function (jqXHR, ajaxOptions, thrownError) {
      alert('No response from server');
      $('.cus-spinner-full').hide(200);
    });
});


// model pagination start

$(document).on('click', '.cus-model-table',function(event){
        event.preventDefault();
        var model =$(this).attr('data-model');
        var id =$(this).attr('data-id');
        var dataurl = commissionbreakdown;
        if(model == "pipscommision"){
            var dataurl = commissionbreakdown;
        }
        
        var page=$(this).attr('href').split('page=')[1];
        $.ajax({
            url:  dataurl,
            type: "get",
            datatype: "html",
            data:{
                id: id,
                model:model
            },
        }).done(function(data){
            $("#mgenreal_search").val("");
            $(".cus-model-empty").empty().html(data);
            $('#commisionbreackdown').modal('show');
            location.hash = page;
        }).fail(function(jqXHR, ajaxOptions, thrownError){
            alert('No response from server');
            $('.cus-spinner-full').hide(200);
        });
    });


 $(document).on('click', '.model-ajax-pag .pagination a',function(event)
    {
        event.preventDefault();
        
        var model = $('.cus-dat-model').attr('data-model');
        var id = $('.cus-dat-model').attr('data-id');
        var dataurl = commissionbreakdown;
        if(model == 'pipscommision'){
            var dataurl = commissionbreakdown;
        }
        
        $('.cus-dat-model').append('<div class="cus-spinner-full"><div class="sk-spinner sk-spinner-three-bounce"><div class="sk-bounce1"></div><div class="sk-bounce2"></div><div class="sk-bounce3"></div></div></div>');
        $(this).parent('li').removeClass('active');
        $(this).parent('li').addClass('active');
        var myurl = $(this).attr('href');
        var page=$(this).attr('href').split('page=')[1];
        $.ajax({
            url:  dataurl+'?page=' + page,
            type: "get",
            datatype: "html",
            data:{
                model: model,
                id:id,
            },
        }).done(function(data){
            $(".cus-model-empty").empty().html(data);
            location.hash = page;
        }).fail(function(jqXHR, ajaxOptions, thrownError){
            alert('No response from server');
            $('.cus-spinner-full').hide(200);
        });
});


// model pagination end

// $(document).on('click', '.ledger-report,',function(event){
//     event.preventDefault();

//     $('.datas').append('<div class="cus-spinner-full"><div class="sk-spinner sk-spinner-three-bounce"><div class="sk-bounce1"></div><div class="sk-bounce2"></div><div class="sk-bounce3"></div></div></div>');
//     // var page=$(this).attr('href').split('page=')[1];

//     var htype = $(this).attr('data-type');
//     getData(0,htype);
// });


/*************************step wizard***************************/
// $(document).ready(function(){  
//   $("#form-wizards-register").steps({
//     bodyTag: "fieldset",
//     labels:{
//     finish: '<button class="btn bg-warning text-white py-4 px-5 font-weight-bold rounded-0 mt-4 mt-md-2 font-18" id="finish">FINISH</button>',
//     next: '<button class="btn bg-warning text-white py-4 px-5 font-weight-bold rounded-0 mt-4 mt-md-2 font-18">NEXT <img src="../images/assets/Staking_Pools/Group179.png" class="img-fluid ml-3 align-middle" alt=""></button>',
//     previous: '<button class="btn bg-transparent border-warning text-white py-4 px-5 mt-4 mt-md-2 font-weight-bold rounded-0 font-18">PREVIOUS <img src="../images/assets/Staking_Pools/Group179.png" class="img-fluid ml-3 align-middle" alt=""></button>'
//   },

//     onInit: function (event, current) {
//       var sigpad = $('#sigpad').signature({syncField: '#signature', syncFormat: 'PNG'});
//       $('#clear').click(function(e) {
//           e.preventDefault();
//           sigpad.signature('clear');
//           $("#signature").val('');
//       });
//         $('.actions > ul > li:first-child').attr('style', 'display:none');
//     },
//     onStepChanging: function (event, currentIndex, newIndex){    
//         $('.actions > ul > li:first-child').attr('style', 'display:block');
//         return true;
//     }

//   });   
//   $('#finish').click(function() {
//     window.location.href = 'login.html';
//     return false;
//   });
// });
$.validator.addMethod(
  "positiveNumber",
  function (value) {
    return Number(value) > 0;
  },
  'Value must be greater than 0'
);
$.validator.addMethod("twoDigitDecimal", function (value, element) {
  var length = value.substring(value.indexOf('.'), value.indexOf('.').length).length;
  if (value.indexOf('.') != -1 && length > 3) {
    console.log('test');
    return false;
  }
  return true;
}, two_decimal_message);
$.validator.addMethod("regex", function (value, element, regexpr) {
  return regexpr.test(value);
}, "Please enter a valid value.");
$("#cryptowalletform").validate({
  rules: {
    amount: {
      required: true,
      positiveNumber: true,
      minlength: 0,
      // maxlength: 6,
      twoDigitDecimal: true
    },
    secure_password: {
      required: true,
    },
    upload_proof: {
      required: true,
      extension: 'png|jpeg|jpg|pdf'
    }
  },
  messages: {
    amount:{
      required:err_field_req,
      positiveNumber:Value_must_be_greater_than_0,
      twoDigitDecimal:two_decimal_message,
    },
    secure_password:{
      required:err_field_req,
    },
    upload_proof:{
      required:err_field_req,
      extension:Please_enter_a_value_with_a_valid_extension_proof,
    },
  },

});
$("#cryptowalletform-myr").validate({
  rules: {
    amount: {
      required: true,
      positiveNumber: true,
      minlength: 0,
      // maxlength: 6,
      twoDigitDecimal: true
    },
    bank_id: {
      required: true,
    },
    secure_password: {
      required: true,
    }
  },
  messages: {
    amount:{
      required:err_field_req,
      positiveNumber:Value_must_be_greater_than_0,
      twoDigitDecimal:two_decimal_message,
    },
    secure_password:{
      required:err_field_req,
    },
    bank_id:{
      required:err_field_req,
    },
  },

});
$("#yield-wallet-confirm").validate({
  ignore: "input[type='text']:hidden",
  rules: {
    amount: {
      required: true,
      number: true,
      positiveNumber: true,
      minlength: 0,
      maxlength: 6,
    },
    fund_type: {
      required: true,
    },
    secure_password: {
      required: true,
    },
  },
  messages: {
    secure_password: {
      required: securepassword_required_field,
    },
    fund_type: {
      required: select_fund_type,
    },
    amount: {
      required: amount_required_field,
      number: enter_valid_number,
      positiveNumber:Value_must_be_greater_than_0,
    },
  },
  submitHandler: function (form, event) {
    withdrawal_popup_txt = withdrawal_popup_txt.replace(':amount', $("input[name=amount]").val());
    if ($('select[name="fund_type"]').val() == '0') {
      withdrawal_popup_txt = withdrawal_popup_txt.replace(':wallet', "Crypto");
    } else if ($('select[name="fund_type"]').val() == '1') {
      withdrawal_popup_txt = withdrawal_popup_txt.replace(':wallet', "Withdrawal");
    } else {
      withdrawal_popup_txt = withdrawal_popup_txt.replace(':wallet', "NFT");
    }
    event.preventDefault();
    swal({
      title: withdrawal_popup_txt,
      text: "",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "btn-danger",
      confirmButtonClass: "btn-success",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      closeOnConfirm: false
    },
      function (isConfirm) {
        if (isConfirm == true) {
          form.submit();
        } else {
          event.preventDefault();
        }
      });

  }
});
if ($('.dropify').length) {
  $('.dropify').dropify({
    messages: {
      'default': 'Drag and drop a file here or click',
      'replace': 'Drag and drop or click to replace',
      'remove': 'Remove',
    }
  });
}
$("#withdrawalform-usdt").validate({
  rules: {
    amount: {
      required: true,
      number: true,
      positiveNumber: true,
      minlength: 0,
      min: 100,
      max: 10000000
    },
    secure_password: {
      required: true,
    },
    usdt_address: {
      required: true,
    },
    upload_proof: {
      required: true,
      extension: 'png|jpeg|jpg'
    }
  },
  messages: {
    amount: {
      required: amount_required_field,
      number: enter_valid_number,
      max: value_less_equal_10000000,
      positiveNumber:Value_must_be_greater_than_0,
      min: Please_enter_a_value_greater_than_or_equal_to_100,
    },
    secure_password: {
      required: securepassword_required_field,
    },
    usdt_address: {
      required: select_bank_country,
    },
    upload_proof: {
      required: err_field_req,
      extension:Please_enter_a_value_with_a_valid_extension_proof,
    }
  },

});
$("#withdrawalform-usdt-trc").validate({
  rules: {
    amount: {
      required: true,
      number: true,
      positiveNumber: true,
      minlength: 0,
      min: 100,
      max: 10000000
    },
    secure_password: {
      required: true,
    },
    usdt_address: {
      required: true,
    },
    upload_proof: {
      required: true,
      extension: 'png|jpeg|jpg'
    }
  },
  messages: {
    amount: {
      required: amount_required_field,
      number: enter_valid_number,
      max: value_less_equal_10000000,
      positiveNumber:Value_must_be_greater_than_0,
      min: Please_enter_a_value_greater_than_or_equal_to_100,
    },
    secure_password: {
      required: securepassword_required_field,
    },
    usdt_address: {
      required: select_bank_country,
    },
    upload_proof: {
      required: err_field_req,
      extension:Please_enter_a_value_with_a_valid_extension_proof,
    }
  },

});
$("#withdrawalform-bank").validate({
  rules: {
    amount: {
      required: true,
      number: true,
      positiveNumber: true,
      minlength: 0,
      min: 100,
      max: 10000000
    },
    secure_password: {
      required: true,
    },
    upload_proof_bank: {
      required: true,
      extension: 'png|jpeg|jpg'
    }
  },
  messages: {
    amount: {
      required: amount_required_field,
      number: enter_valid_number,
      max: value_less_equal_10000000,
      positiveNumber:Value_must_be_greater_than_0,
      min: Please_enter_a_value_greater_than_or_equal_to_100,
    },
    secure_password: {
      required: securepassword_required_field,
    },
    upload_proof_bank: {
      required: err_field_req,
      extension:Please_enter_a_value_with_a_valid_extension_proof,
    }
  },

});
$("#cryptowalletform-coin").validate({
  rules: {
    amount: {
      required: true,
      number: true,
      positiveNumber: true,
      minlength: 0,
      min: 10,
      max: 10000000
    },
    secure_password: {
      required: true,
    },
  },
  messages: {
  },

});

/*function getData(page,htype = 0){
    $.ajax(
    {
        url: '?page=' + page,
        type: "get",
        datatype: "html",
        data:{
            general_search: $('#sgenreal_search').val(),
            type: $( "#S_type option:selected" ).val(),
            status: $( "#S_status option:selected" ).val(),
            spagination: $( "#spagination option:selected" ).val(),
            htype: htype,
        },
    }).done(function(data){
        $(".table-pisprebate").empty().html(data);
        location.hash = page;
    }).fail(function(jqXHR, ajaxOptions, thrownError){
            alert('No response from server');   
            $('.cus-spinner-full').hide(200);
    });
  }*/

$(document).on('click', '.ticket-ajax-pag .pagination a', function (event) {
  event.preventDefault();

  $('.datas').append('<div class="cus-spinner-full"><div class="sk-spinner sk-spinner-three-bounce"><div class="sk-bounce1"></div><div class="sk-bounce2"></div><div class="sk-bounce3"></div></div></div>');
  $(this).parent('li span').parent('li span').removeClass('bg-warning px-1');
  $(this).parent('li span').addClass('bg-warning px-1');
  var myurl = $(this).attr('href');
  var page = $(this).attr('href').split('page=')[1];
  getData(page);
});
//For hepla and support 
$(document).on('click', '.help-ajax', function (event) {
  event.preventDefault();

  $('.datas').append('<div class="cus-spinner-full"><div class="sk-spinner sk-spinner-three-bounce"><div class="sk-bounce1"></div><div class="sk-bounce2"></div><div class="sk-bounce3"></div></div></div>');
  // var page=$(this).attr('href').split('page=')[1];

  var htype = $(this).attr('data-type');
  getData(0, htype);
});








//Suport ticket 
$("#support-ticket").validate({
  ignore: "input[type='text']:hidden",
  rules: {
    subject_id: {
      required: true,
    },
    message: {
      required: true,
      normalizer: function (value) {
        return $.trim(value);
      }
    },
    'attachment[]': {
      extension: "pdf|jpg|jpeg|png|JPG|JPEG",
      // filesize: 12000000
    }
  },
  messages: {
    subject_id: {
      required: title_required,
    },
    message: {
      required: messages_required,
    },
    'attachment[]': {
      extension: upload_bank_proof_img,
      // filesize: 'File size must be less than 12MB',
    }
  },
});
$("#personal-detail-upadte").validate({
  ignore: "input[type='text']:hidden",
  rules: {
    fullname: {
      required: true,
      maxlength: 50,
    },
    address: {
      required: true,
      maxlength: 100,
    },
    city: {
      required: true,
      maxlength: 50,
    },
    state: {
      required: true,
      maxlength: 50,
    },
    country: {
      required: true,
    },
    phone_number: {
      required: true,
      number: true,
      minlength: 10,
      maxlength: 15,
    },
  },
  messages: {
    fullname: {
      required: enter_full_name,
      maxlength: please_enter_no_more_than_50,
    },
    address: {
      required: please_enter_address,
      maxlength: please_enter_no_more_than_100,
    },
    city: {
      required: please_enter_city,
      maxlength: please_enter_no_more_than_50,
    },
    state: {
      required: please_enter_state,
      maxlength: please_enter_no_more_than_50,
    },
    country: {
      required: Please_select_country,
    },
    phone_number: {
      required: phone_number_required_field,
      number: enter_valid_number,
      minlength: please_enter_least_10_characters,
      maxlength: please_enter_no_more_than_15,
    },
  },
});
$("#bank-detail-upadte").validate({
  ignore: "input[type='text']:hidden",
  rules: {
    bank_name: {
      required: true,
      maxlength: 50,
    },
    acc_holder_name: {
      required: true,
      maxlength: 50,
      // equalTo: "#fullname"
    },
    acc_number: {
      required: true,
      // number: true,
      maxlength: 20,
    },
    swift_code: {
      required: true,
      // number: true,
      maxlength: 20,
    },
    bank_branch: {
      required: true,
      maxlength: 50,
    },
    bank_country_id: {
      required: true,
    },
  },
  messages: {
    bank_name: {
      required: bankname_required_field,
      maxlength: please_enter_no_more_than_50,
    },
    acc_holder_name: {
      required: accountholder_required_field,
      maxlength: please_enter_no_more_than_50,
      equalTo: account_holder_name_and_full_name_same
    },
    acc_number: {
      required: accountnumber_required_field,
      maxlength: please_enter_no_more_than_20,
    },
    swift_code: {
      required: swift_code_required_field,
      maxlength: please_enter_no_more_than_20,
    },
    bank_branch: {
      required: bank_branch_required_field,
      maxlength: please_enter_no_more_than_50,
    },
    bank_country_id: {
      required: bank_country_required_field,
    },

  },
});
$("#nft-wallet-address-upadte").validate({
  ignore: "input[type='text']:hidden",
  rules: {
    nft_wallet_address: {
      required: true,
      maxlength: 50,
    },
  },
  messages: {
    nft_wallet_address: {
      required: Please_enter_nft_wallet_address,
      maxlength: please_enter_no_more_than_50,
    },
  },
});
$.validator.addMethod('mindate', function (v, el) {
  // if (this.optional(el)){
  //     return true;
  // }
  if ($("input[name=start_date]").val() == '') {
    return true;
  }
  var end_date = $("input[name=end_date]").datepicker('getDate');

  var start_date = $(el).datepicker('getDate');
  return end_date >= start_date;
}, 'From Date must be less then To date');

$.validator.addMethod('maxdate', function (v, el) {
  if (this.optional(el)) {
    return true;
  }
  if ($("input[name=start_date]").val() == '') {
    return false;
  }
  var end_date = $("input[name=end_date]").datepicker('getDate');

  var start_date = $("input[name=start_date]").datepicker('getDate');
  return end_date >= start_date;
}, 'To date must be greater then From date');
$.validator.addMethod('c_mindate', function (v, el) {
  // if (this.optional(el)){
  //     return true;
  // }
  if ($("input[name=c_start_date]").val() == '') {
    return true;
  }
  var end_date = $("input[name=c_end_date]").datepicker('getDate');

  var start_date = $(el).datepicker('getDate');
  return end_date >= start_date;
}, 'From Date must be less then To date');

$.validator.addMethod('c_maxdate', function (v, el) {
  if (this.optional(el)) {
    return true;
  }
  if ($("input[name=c_start_date]").val() == '') {
    return false;
  }
  var end_date = $("input[name=c_end_date]").datepicker('getDate');

  var start_date = $("input[name=c_start_date]").datepicker('getDate');
  return end_date >= start_date;
}, 'To date must be greater then From date');
$("#export-staking-pool").validate({
  /*errorPlacement: function(error, element) {
      error.insertAfter(element.parent('div').parent('div'));
    },*/
  rules: {
    start_date: {
      // required: true,
      mindate: true,
    },
    end_date: {
      // required: true,
      maxdate: true,
    },

  }, messages: {
    "start_date": {
      mindate: "Start Date must be less then End Date"
    },
    "end_date": {
      maxdate: "End Date must be greater then Start Date"
    },

  }
});
$("#reports-pairing-commissions-export").validate({
  /*errorPlacement: function(error, element) {
      error.insertAfter(element.parent('div').parent('div'));
    },*/
  rules: {
    c_start_date: {
      // required: true,
      c_mindate: true,
    },
    c_end_date: {
      // required: true,
      c_maxdate: true,
    },

  }, messages: {
    "c_start_date": {
      c_mindate: "Start Date must be less then End Date"
    },
    "c_end_date": {
      c_maxdate: "End Date must be greater then Start Date"
    },

  }
});
// commission-wallet-form validation
$("#commission-wallet-confirm").validate({
  ignore: "input[type='text']:hidden",
  rules: {
    amount: {
      required: true,
      number: true,
      positiveNumber: true,
      minlength: 0,
      maxlength: 6,
    },
    fund_type: {
      required: true,
    },
    secure_password: {
      required: true,
    },
  },
  messages: {
    secure_password: {
      required: securepassword_required_field,
    },
    fund_type: {
      required: select_fund_type,
    },
    amount: {
      required: amount_required_field,
      number: enter_valid_number,
      positiveNumber:Value_must_be_greater_than_0,
    },
  },
});
$("#profile-image-update").validate({
  rules: {
    profile_image: {
      // required: true,
      extension: 'png|jpeg|jpg'
    }
  },
  messages: {
    extension:Please_enter_a_value_with_a_valid_extension,
  },

});
//Verify update Password

$("#password-update").validate({
  ignore: "input[type='text']:hidden",
  rules: {
    password: {
      required: true,
      minlength: 8,
      maxlength: 15
    },
    confirm_password: {
      required: true,
      equalTo: "#password"
    },
    // otpverify:{
    //     required: true,
    // }
  },
  messages: {
    password: {
      required: password_required_field,
      minlength: please_enter_least_8_characters,
      maxlength: please_enter_no_more_than_15
    },
    confirm_password: {
      required: repeatpassword_required_field,
      equalTo: please_enter_same_value
    },
    otpverify: {
      required: opt_required_field,
    }
  },

});

// Secure Password
$("#secure-password-update").validate({
  ignore: "input[type='text']:hidden",
  rules: {
    password: {
      required: true,
      minlength: 8,
      maxlength: 15
    },
    confirm_password: {
      required: true,
      equalTo: "#secure_password"
    },
    // otpverify:{
    //     required: true,
    // }
  },
  messages: {
    password: {
      required: password_required_field,
      minlength: please_enter_least_8_characters,
      maxlength: please_enter_no_more_than_15
    },
    confirm_password: {
      required: repeatpassword_required_field,
      equalTo: please_enter_same_value
    },
    otpverify: {
      required: opt_required_field,
    }
  },
});

//Create New Ticket Hide Error Message
$('#new-tickets').on('hidden.bs.modal', function () {
  $('#new-tickets form')[0].reset();
  $("label.error").hide();
  $(".error-text").html("");
});
/***Copy element funtion*/
if ($('#copy_code').length) {
  document.getElementById("copy_code").addEventListener("click", function () {
    copyToClipboard(document.getElementById("copy-class-text"));
  });
}
if ($('#copy_address').length) {
  document.getElementById("copy_address").addEventListener("click", function () {
    copyToClipboard(document.getElementById("copy-class-textaddress"));
  });
}
function copyToClipboard(elem) {
  // create hidden text element, if it doesn't already exist
  var targetId = "_hiddenCopyText_";
  var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
  var origSelectionStart, origSelectionEnd;
  if (isInput) {
    // can just use the original source element for the selection and copy
    target = elem;
    origSelectionStart = elem.selectionStart;
    origSelectionEnd = elem.selectionEnd;
  }
  else {
    // must use a temporary form element for the selection and copy
    target = document.getElementById(targetId);
    if (!target) {
      var target = document.createElement("textarea");
      target.style.position = "absolute";
      target.style.left = "-9999px";
      target.style.top = "0";
      target.id = targetId;
      document.body.appendChild(target);
    }
    target.textContent = elem.textContent;
  }
  // select the content
  var currentFocus = document.activeElement;
  target.focus();
  target.setSelectionRange(0, target.value.length);

  // copy the selection
  var succeed;
  try {
    succeed = document.execCommand("copy");
  } catch (e) {
    succeed = false;
  }
  // restore original focus
  if (currentFocus && typeof currentFocus.focus === "function") {
    currentFocus.focus();
  }

  if (isInput) {
    // restore prior selection
    elem.setSelectionRange(origSelectionStart, origSelectionEnd);
  } else {
    // clear temporary content
    target.textContent = "";
  }
  jQuery('.copy_text').show().fadeOut(1500);
  return succeed;
}

$("#purchase_product").validate({
    ignore: "input[type='text']:hidden",
    rules: {
        security_password: {
            required: true,
        },
    },
    messages: {
        security_password: {
            required: securepassword_required_field,
        },
    },
     submitHandler: function(form) {
        swal({
            title: "Are you sure? ",
            text: "You want to buy "+$('#name').val()+" !",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4B49AC",
            confirmButtonText: "Yes",
            closeOnConfirm: false
        }, function(isConfirm){
            if (isConfirm) form.submit();
        });
    }
});
function showNFTSell(bid)
{

  view = viewnftsell.replace(':id', bid);
  $.ajax({
    url:view,
    type:'GET',
    dataType: "json" ,
    success:function(response){
            // console.log(response);
            $(response.viewNFTSell).insertAfter( $( "#nftmodel" ) );
            $("#bullKongModal").modal('toggle');           
          },
        });
}


function viewcounteroffer(nftid)
{

  counteroffer = nftviewcounteroffer.replace(':id', nftid);
  $.ajax({
    url:counteroffer,
    type:'GET',
    dataType: "json" ,
    success:function(response){
            // console.log(response);
            $(response.viewCountdownoffer).insertAfter( $( "#countdownmodelshow" ) );
            $("#viewcountdown-Modal").modal('toggle');           
          },
    });
}
