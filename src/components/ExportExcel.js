import React from 'react'
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style';
import { Button } from 'react-bootstrap';

function ExportExcel({ excelData, fileName, className }) {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button className={className} onClick={(e) => exportToExcel(fileName)}>Download</Button>
    )
}

export default ExportExcel