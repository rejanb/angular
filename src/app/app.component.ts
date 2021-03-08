import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //code for multiple export

  fileArray = new Array<string>();

  onFileSelectss(input) {
    console.log(input.files);
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        console.log(input.files[i]);
        var reader = new FileReader();
        reader.onload = (e: any) => {
          this.fileArray.push(e.target.result);
          //console.log('Got here: ', e.target.result);
          // this.obj.photoUrl = e.target.result;
        };
        reader.readAsDataURL(input.files[i]);
      }
    }
  }

  public downloadss() {
    var doc = new jsPDF('p', 'mm', 'A4'); //jsPDF(orientation, unit, format)
    let header = document.getElementById('header').textContent;
    let firstName = document.getElementById('firstName').textContent;
    let lastName = document.getElementById('lastName').textContent;
    let address = document.getElementById('address').textContent;
    let phone = document.getElementById('phone').textContent;
    let photo = document.getElementById('photo')['src'];

    doc.setFontSize(20);
    doc.text(header, 80, 40);

    doc.addImage(photo, 'JPEG, PNG', 88, 50, 30, 30);

    doc.setFontSize(10);
    doc.text('Full Name  : ' + firstName + '' + lastName, 80, 87);
    doc.text('Address     : ' + address, 80, 92);
    doc.text('Phone No  : ' + phone, 80, 97);

    this.fileArray.forEach((file) => {
      doc.addPage('a4', 'p');
      doc.addImage(file, 'JPEG, PNG', 0, 0, 300, 300);
    });

    doc.save('convertedPdf.pdf');
  }

  //code for bulk export
  collection = {};

  onFileSelect(input) {
    const fileArray = new Array<string>();
    console.log(input.files);
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        console.log(input.files[i]);
        var reader = new FileReader();
        reader.onload = (e: any) => {
          fileArray.push(e.target.result);
          //console.log('Got here: ', e.target.result);
          // this.obj.photoUrl = e.target.result;
        };

        reader.readAsDataURL(input.files[i]);
      }
      this.collection[input.id] = fileArray;
    }
  }

  public download() {
    var doc = new jsPDF('p', 'mm', 'A4'); //jsPDF(orientation, unit, format)
    let header = document.getElementById('header').textContent;
    for (var i = 1; i <= 2; i++) {
      let firstName = document.getElementById('firstName' + i).textContent;
      let lastName = document.getElementById('lastName' + i).textContent;
      let address = document.getElementById('address' + i).textContent;
      let phone = document.getElementById('phone' + i).textContent;
      let photo = document.getElementById('photo' + i)['src'];

      //console.log(this.fileArray);
      // fi.onchange = function (event) {
      //   var fileList = fi.files;
      //   //TODO do something with fileList.
      // };

      //alert(String(fi));

      doc.setFontSize(20);
      doc.text(header, 80, 40);

      doc.addImage(photo, 'JPEG, PNG', 88, 50, 30, 30);

      doc.setFontSize(10);
      doc.text('Full Name  : ' + firstName + '' + lastName, 80, 87);
      doc.text('Address     : ' + address, 80, 92);
      doc.text('Phone No  : ' + phone, 80, 97);

      this.collection['afile' + i].forEach((file) => {
        doc.addPage('a4', 'p');
        doc.addImage(file, 'JPEG, PNG', 0, 0, 300, 300);
      });
      //doc.addImage(this.fileArray[0], 'JPEG, PNG', 88, 50, 30, 30);

      // doc.setFontSize(10);
      // doc.text('Full Name  : ' + firstName + '' + lastName, 80, 87);
      // doc.text('Address     : ' + address, 80, 92);
      // doc.text('Phone No  : ' + phone, 80, 97);
      if (i !== 2) doc.addPage('a4', 'p'); ///if more student details
    }

    doc.save('convertedPdf.pdf');
  }
}
