import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public download() {
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

    doc.save('convertedPdf.pdf');
  }
}
