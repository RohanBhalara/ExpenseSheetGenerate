import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Form, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap'
import './home.css';
import DownloadModal from '../components/DownloadModal';
import info from './../images/info.png';

function Home() {
    const [data, setData] = useState("");
    const [home, setHome] = useState("");
    const [purposeOfVisit, setPurposeOfVisit] = useState("");
    const [modeOfConveyance, setModeOfConveyance] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [formattedData, setFormattedData] = useState([]);
    const [showDownloadModal, setShowDownloadModal] = useState(false);

    const handleChange = useCallback(() => {
        console.log(data);
        const rows = data.split('@');
        console.log(rows);

        let arr = [];
        rows.map((item) => {
            const places = item.slice(0, item.indexOf("/") - 2);
            const date = item.slice(item.indexOf("/") - 2, item.indexOf("/") + 8);
            const startTime = item.slice(item.indexOf(":") - 2, item.indexOf(":") + 3);
            const endTime = item.slice(item.lastIndexOf(":") - 2, item.lastIndexOf(":") + 3);

            const locations = places ? places.split(",") : [];
            locations.map((place, index) => {
                let row;
                if (index === 0) {
                    row = {
                        date,
                        purposeOfVisit,
                        modeOfConveyance,
                        vehicleNumber,
                        from: home,
                        startTime: startTime,
                        to: place,
                        endTime: ''
                    }
                    arr = [...arr, row];
                }
                row = {
                    date,
                    purposeOfVisit,
                    modeOfConveyance,
                    vehicleNumber,
                    from: place,
                    startTime: '',
                    to: places.split(",").length - 1 === index ? home : places.split(",")[index + 1],
                    endTime: places.split(",").length - 1 === index ? endTime : ''
                }
                arr = [...arr, row];
            })
        })

        setFormattedData(arr);
        console.log(arr);
    }, [home, purposeOfVisit, modeOfConveyance, vehicleNumber, data])

    useEffect(() => {
        handleChange()
    }, [home, purposeOfVisit, modeOfConveyance, vehicleNumber, data])

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Places - Date - Start time - End time - @
        </Tooltip>
    );

    return (
        <>
            <div className='container my-5'>
                <h1>Expense Sheet Generator</h1>

                <Form>
                    <Row>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Home</Form.Label>
                            <Form.Control type="text" placeholder="Enter home" value={home} onChange={(e) => setHome(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Purpose of visit</Form.Label>
                            <Form.Control type="text" placeholder="Enter purpose of visit" value={purposeOfVisit} onChange={(e) => setPurposeOfVisit(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Mode</Form.Label>
                            <Form.Control type="text" placeholder="Enter Mode" value={modeOfConveyance} onChange={(e) => setModeOfConveyance(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Vehicle Number</Form.Label>
                            <Form.Control type="text" placeholder="Enter vehicle number" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Data
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                            >
                                <img src={info} style={{ height: 30, width: 30, objectFit: 'contain' }} />
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control as="textarea" placeholder="Enter data" value={data} onChange={(e) => setData(e.target.value)} />
                    </Form.Group>
                </Form>
                <h2 id='result'>Result</h2>
                <Button onClick={() => setShowDownloadModal(true)} className="my-3">Download</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Purpose Of Visit</th>
                            <th>Mode Of Conveyance</th>
                            <th>Vehicle Number</th>
                            <th>From</th>
                            <th>Time</th>
                            <th>To</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formattedData.length ? formattedData.map((item, index) => {
                            return (
                                <tr key={`${index}ƒ`}>
                                    <td>{item.date}</td>
                                    <td>{item.purposeOfVisit}</td>
                                    <td>{item.modeOfConveyance}</td>
                                    <td>{item.vehicleNumber}</td>

                                    <td>{item.from}</td>
                                    <td>{item.startTime}</td>
                                    <td>{item.to}</td>
                                    <td>{item.endTime}</td>
                                </tr>
                            )
                        })
                            :
                            <tr>
                                <td colSpan={8} className='text-center'><span><em>No data to display</em></span></td>
                            </tr>}
                    </tbody>
                </Table>
            </div>
            <DownloadModal data={formattedData} show={showDownloadModal} setShow={setShowDownloadModal} />
        </>
    )
}

export default Home