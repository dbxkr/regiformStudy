const all_info = $(".row");
const check_phone = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
const check_sn_front = /^([0-9]{6})$/;
const check_sn_back = /^(([1|2|3|4])[0-9]{6})$/;

$(".postalcode").click(function (event) {
  event.preventDefault();
  new daum.Postcode({
    oncomplete: function (data) {
      let addr;
      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }
      $(".add").val(addr);
      $(".postal").val(data.zonecode);
      $(".detailed_add").focus();
    },
  }).open();
});

$(".delete").click(function (event) {
  event.preventDefault();
  for (info of all_info) {
    $(info).find("input").val("");
  }
});

$("#mails").on("change", function () {
  if ($(this).val() != "free") {
    $(".mail").val($(this).val());
    $(".mail").prop("disabled", true);
  } else {
    $(".mail").val("");
    $(".mail").prop("disabled", false);
  }
});

$(".sn_f").on("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});
$(".sn_b").on("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});
$(".phone").on("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "");
});

$(".regi").on("submit", function (event) {
  if (checkID() && checkPh() && checkPw() && checkSn()) {
  } else {
    event.preventDefault();
  }
});

function checkID() {
  if ($(".id").val().length > 3) {
    return true;
  } else {
    alert("아이디는 4글자 이상이어야 합니다");
    return false;
  }
}
function checkPw() {
  if ($(".pw").val() != "") {
    if ($(".pw").val() == $(".pw_check").val()) {
      return true;
    } else {
      alert("비밀번호와 확인이 일치하지 않습니다.");
      return false;
    }
  } else {
    alert("비밀번호를 입력하세요");
    return false;
  }
}
function checkSn() {
  if (
    check_sn_front.test($(".sn_f").val()) &&
    check_sn_back.test($(".sn_b").val())
  ) {
    return true;
  } else {
    alert("질못된 형식의 주민등록 번호입니다");
    return false;
  }
}
function checkPh() {
  if (check_phone.test($(".phone").val())) {
    return true;
  } else {
    alert("핸드폰 번호를 확인해주세요.");
    return false;
  }
}
