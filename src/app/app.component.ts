import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  fileArray = new Array<string>();
  // public FileDetails() {
  //   // GET THE FILE INPUT.SS
  //   //var fi = document.getElementById('file');
  //   alert('hello');
  // }
  onFileSelect(input) {
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

  public download() {
    var doc = new jsPDF('p', 'mm', 'A4'); //jsPDF(orientation, unit, format)
    let header = document.getElementById('header').textContent;
    let firstName = document.getElementById('firstName').textContent;
    let lastName = document.getElementById('lastName').textContent;
    let address = document.getElementById('address').textContent;
    let phone = document.getElementById('phone').textContent;
    let photo = document.getElementById('photo')['src'];

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

    this.fileArray.forEach((file) => {
      doc.addPage('a4', 'p');
      doc.addImage(file, 'JPEG, PNG', 0, 0, 300, 300);
    });
    //doc.addImage(this.fileArray[0], 'JPEG, PNG', 88, 50, 30, 30);

    // doc.setFontSize(10);
    // doc.text('Full Name  : ' + firstName + '' + lastName, 80, 87);
    // doc.text('Address     : ' + address, 80, 92);
    // doc.text('Phone No  : ' + phone, 80, 97);

    doc.save('convertedPdf.pdf');
  }
}
