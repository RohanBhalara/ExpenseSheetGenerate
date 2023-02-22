import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import ExportExcel from './ExportExcel';

function DownloadModal({ data, show, setShow }) {
    const [fileName, setFileName] = useState("");

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton={() => setShow(false)}>
                <Modal.Title>File Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Control
                        autoFocus={true}
                        type="text" placeholder="Enter file name"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)} />
                    <Form.Text className="text-muted">
                        Default it will be saved as ExpenseExcelSheet.
                    </Form.Text>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <ExportExcel excelData={data} fileName={fileName || 'ExpenseExcelSheet'} />
            </Modal.Footer>
        </Modal>
    )
}

export default DownloadModal