import { Component, OnInit } from '@angular/core';
import 'datatables.net'
import * as $ from 'jquery'


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {

      const Url = "http://34.213.106.173/api/user/getAdminUserList"


      $.ajax({
        url: Url,
        type: "GET",
        success: function (result) {
          console.log(result);
          var user = [];
          for (var i = 0; i < result.data.data.length; i++) {
            user.push([(i + 1), result.data.data[i].firstName, result.data.data[i].lastName, result.data.data[i].email, result.data.data[i].service])
          }
          var uList = $('#users_list').DataTable({
            data: user,
            "columnDefs": [
              {
                "render": function (data, type, row, meta) {
                  return "<button type='button' class='btn btn-primary btn-block' data-toggle='modal' data-target='#modal'>ClicK</button>"
                },
                "targets": 5
              }]
          });

          $('#users_list').on('click', 'tr', function () {
            var index = uList.row(this).index()
            $('#head_name').html('<h3>' + result.data.data[index].firstName + ' ' + result.data.data[index].lastName + '</h3>');
            $('#content1').html('<p> PhoneNumber : '+ +result.data.data[index].phoneNumber + '</p>');
            $('#content2').html('<p> Role : ' + result.data.data[index].role + '</p>');
            $('#content3').html('<p> Service : ' + result.data.data[index].service + '</p>');
            $('#content4').html('<p> Created Date : ' + result.data.data[index].createdDate + '</p>');
            $('#content5').html('<p> Username : ' + result.data.data[index].username + '</p>');
            $('#content6').html('<p> Email : ' + result.data.data[index].email + '</p>');
            $('#content7').html('<p> Email Verified : ' + result.data.data[index].emailVerified + '</p>');
          })
        },
        error: function (error) {
          console.log(error);
        }

      })



      $(document).ready(function () {
        var token = localStorage.getItem('token');
        $.ajax({
          type: "GET",/**posting the data */
          url: 'http://34.213.106.173/api/user/UserStatics',
          headers: {
            'Authorization': token,
          },

          error: function (response) {/**if error exists then print the alert */
            console.log('Error in login');
            alert("Enter all the details");
          },
          success: function (response) {
            console.log("successfull");
            console.log(response);
            var arr = response.data.details;
            var html = "";
            for (var i = 0; i < arr.length; i++) {
              html += "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'><div class='card' style='margin-top:10%; background:black; border-radius:60%;width:200px;height:200px'>";
              html += "<div class='card-title' style='padding-top:10%;text-transform:uppercase; color:white'><h4><b>" + arr[i].service + "</b></h4></div>";
              html += "<div class='card-body' style='padding-bottom:10%; color:white'>Number of users: " + arr[i].count + "</div>";
              html += "</div></div>";
            }
            $("#services").html(html);

          }


        });
        $('#logout').click(function () {
          var logoutUrl = " http://34.213.106.173/api/user/logout "
          $.ajax({
            url: logoutUrl,
            headers: {
              'Authorization': token
            },
            type: "POST",
            success: function (result) {
              localStorage.removeItem('token');
              $(location).attr('href',' login-admin')
            },
            error: function (error) {
              console.log(error);
              alert("Logout Unsucessfull ")
            }

          })
        })
      })
    })
  }

}