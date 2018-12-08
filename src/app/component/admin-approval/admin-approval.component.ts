
import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
// import { MatSnackBar } from '@angular/material';

// import{HttpService} from ''
@Component({
  selector: 'app-admin-approval',
  templateUrl: './admin-approval.component.html',
  styleUrls: ['./admin-approval.component.css']
})
export class AdminApprovalComponent implements OnInit {

  constructor() { }
  

  ngOnInit() {
    $('#home').click(function(){
           $(location).attr('href','admin-dashboard') 
           })

    
    $(document).ready(function () {
      var token = localStorage.getItem('token');
      var    questionArray = [];

      /**AJAX is a technique for accessing web servers from a web page. */
      $.ajax({
        type: 'GET',
        url: 'http://34.213.106.173/api/questionAndAnswerNotes/getUnApprovedAnswer',
        dataType: "json",
        headers: {
          'Authorization': token,
        },
      
        /**error callback of $.ajax if error occcurs */
        error: function (response) {
          console.log('error');
          return false;

        },/**success is callback of $.ajax */

        success: function (response) {
          var questionId=[];
          console.log("successfull");
          console.log(response.data);
          for (var i = 0; i < response.data.length; i++) {
            questionArray.push([i+1, response.data[i].message, 
            '<button class="newBtn btn btn-warning mx-4 align:center" type="button">Approve</button>',
            '<button class="Mybtn btn  btn-warning mr-1"  type="button">Reject</button>'  ]);
            questionId.push(response.data[i])
          }

          var questionArray1 = $('#users_list').DataTable({
            data: questionArray,
            "columns":[
              {"width":"10%"},
              {"width":"70%"},
              {"width":"10%"},
              {"width":"10%"}
            ]
            
            // scroller: true,
            // scrollY: 300,
            // scrollX:false,
      
          });
 parent;
    $('#users_list').on('click', '.newBtn', function () {

      var RowIndex = $(this).closest('tr');
      var data = questionArray1.row(RowIndex).data();
      for (var i = 0; i < questionId.length; i++) {
      if(data[1] == questionId[i].message){
        this.parent=questionId[i].id;
       

      }

      }
      

      $.ajax({
        type: 'POST',
        url: 'http://34.213.106.173/api/questionAndAnswerNotes/approve/'+this.parent,
        dataType: "json",
        isApproved:true,
        headers: {
          'Authorization': token,
        },
       
  
        /**error callback of $.ajax if error occcurs */
        error: function (response) {
          console.log('error');
          return false;

        },/**success is callback of $.ajax */
        success: function (response) {
          console.log('success',response);
          console.log(response.data);
          $(this).addClass('row_selected');
          alert('approved');
          location.reload(true); 

        }

      });
     
    
  });
  var  parentNew;
  $('#example').on('click', '.Mybtn', function (e) {

    var RowIndex = $(this).closest('tr');
    var data = questionArray1.row(RowIndex).data();
    console.log('questioniduyhj',data);
    console.log('questionid...',questionId[0].id);

    for (var i = 0; i < questionId.length; i++) {
   if(data[1] == questionId[i].message){
      this.parentNew=questionId[i].id;

    }

    }
    console.log('questionid...',this.parentNew);

    $.ajax({
      type: 'POST',
      url: 'http://34.213.106.173/api/questionAndAnswerNotes/reject/'+this.parentNew,
      dataType: "json",
      headers: {
        'Authorization': token,
      },
    
      
      error: function (response) {
        console.log('error');
        return false;

      },
      success: function (response) {
        
       
        alert('Reject')
        location.reload(true);
      }
    });
});
  return false;
        },
      });
    });

  }
}