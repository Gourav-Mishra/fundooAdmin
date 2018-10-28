import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {
      const Url = "http://34.213.106.173/api/user/adminLogin";
      $('#login').click(function () {


        var val = '' + $("#email").val();
        var regexEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!regexEmail.test(val)) {
          $('#email').val('');
          $("h5").text("Invalid Email Format").show().fadeOut(6000);;

        }

        else if (($("#email").val() == '') && $("#password").val() == '') {

          $("h5").text("Email and Password are Required").show().fadeOut(6000);;
        }
        else if ($("#email").val() == '') {
          $('#email').val('');
          $("h5").text("Enter email").show().fadeOut(8000);
        }
        else if ($("#password").val() == '') {
          $('#password').val('');

          $("h5").text("Enter Your password").show().fadeOut(8000);
        } else {

          var body = {
            "email": $("#email").val(),
            "password": $("#password").val()
          }
        }
        $.ajax({
          url: Url,
          data: body,
          type: "POST",
          success: function (result) {
            console.log(result);
            localStorage.setItem('token', result.id);
            // alert("Sucessfully LogedIn")
            $(location).attr('href', 'admin-dashboard')
            localStorage.setItem('token', result.id);


          },
          error: function (error) {
            console.log(error);
            alert("Login Unsucessfull ")
          }

        })
        return false;

      })


    })
  }

}
