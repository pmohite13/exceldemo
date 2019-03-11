import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-timeoffice-bifurcation',
  templateUrl: './timeoffice-bifurcation.component.html',
  styleUrls: ['./timeoffice-bifurcation.component.scss']
})
export class TimeofficeBifurcationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';

  onFileChange(evt: any) {
    debugger;
    console.log('entered in on file change event');
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      debugger;
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
    };
    reader.readAsBinaryString(target.files[0]);
  }

  export(): void {
    /* process data */
    this.process(this.data);
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  process(data: any[][]): any {
    debugger;

    /* setting heading */
    let strReportTitlePart2 = this.data[3][3] ? this.data[3][3].substring(this.data[3][3].lastIndexOf('from')) : this.data[3][4].substring(this.data[3][4].lastIndexOf('from'));
    let strReportTiltePart1 = "EMPLOYEE WISE ATTENDANCE DETAILS";
    this.data[3][3] = strReportTiltePart1.concat(strReportTitlePart2);

    /* setting column headers */
    this.data[5][0] = 'Sr. No.';
    this.data[5][1] = 'PayCode';
    this.data[5][2] = 'Card No';
    this.data[5][3] = 'Employee Name';
    this.data[5][4] = 'Working Day Present';
    this.data[5][5] = 'Working Day Absent';
    this.data[5][6] = 'Sunday Present';
    this.data[5][7] = 'Sunday Absent';
    this.data[5][8] = 'Weekly Off /Total Sunday';
    this.data[5][9] = ' Holiday';
    this.data[5][10] = 'Leave';
    this.data[5][11] = 'OT';
    // removing all other header columns
    this.data[5].length = 12;
    let count = 1;

    for (let row = 7; row < data.length; row += 10) {
      count++;
     // for (let col = 0; col < 12; col++) {
        this.data[row][3] = this.data[row][2];
        this.data[row][2] = this.data[row][1];
        this.data[row][1] = this.data[row][0];
        this.data[row][0] = count;
     // }
    }
  }



}
