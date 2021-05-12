/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import MUIDataTable from "mui-datatables";
import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { Modal, Button, Form } from "react-bootstrap";
import { getTicketData, addTicket } from "../../actions/ticketAction";
import { toast } from 'react-toastify';
import useValidator from '../../hooks/useValidator'


const Tickets = ({ addTicket }) => {

    // Local state
    const [validator, showValidationMessage] = useValidator()
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(1);
    const [searchText, setSearchText] = useState();
    const [columnSortDirection, setColumnSortDirection] = useState(['none', 'none', 'none']);
    const [data, setData] = useState(["Loading Data..."]);
    const [show, setShow] = useState(false);
    const [ticket_desc_val, setTicketDesc] = useState('');
    const [tablestate, setTableState] = useState('');
    const fromRef = useRef('')

    const setTableData = async (tableState) => {
        setTableState(tableState);
        const { page, activeColumn, searchText, columns, rowsPerPage, filterList } = tableState;
        const sortDir = (activeColumn !== null) ? columns[activeColumn].sortOrder : null;
        const sortColumn = (activeColumn !== null) ? columns[activeColumn].name : null
        const qryString = `page=${page}&sortColumn=${sortColumn}&searchText=${searchText}&sortDir=${sortDir}&rowsPerPage=${rowsPerPage}&filterList=${filterList[2]}`
        const userData = await getTicketData(qryString);
        if (userData && userData.data) {
            (userData.data.meta) ? setPage(userData.data.meta.currentPage) : '';
            (userData.data.meta) ? setCount(userData.data.meta.totalNumberOfResults) : '';
            setData(userData.data.data)
        }
    }

    const handleSubmit = async () => {
        if (validator.allValid()) {
            addTicket({ ticket_desc: ticket_desc_val }).then((data) => {
                toast.success(data.message);
                setTableData(tablestate);
                setTicketDesc();
                setShow(false);
            })
        } else {
            showValidationMessage(true);
        }
    };

    const handleClose = () => {
        setShow(false);
    }

    const handleOpen = () => {
        setShow(true);
    }

    const handleDescChange = (event) => {
        setTicketDesc(event.target.value)
    }

    const sort = (column, order) => {
        let temp = {};
        temp.column = column;
        temp.order = order;
        temp.page = page;

        let newColumnSortDirections = ['none', 'none', 'none', 'none'];

        switch (column) {
            case 'ticket_no':
                newColumnSortDirections[0] = order;
                break;
            case 'ticket_desc':
                newColumnSortDirections[1] = order;
                break;
            case 'first_name':
                newColumnSortDirections[2] = order;
                break;
            case 'created_at':
                newColumnSortDirections[3] = order;
                break;

            default:
                break;
        }
        newColumnSortDirections[column.index] = order;
        setColumnSortDirection(newColumnSortDirections)
    };

    /**
     * Datatable options
     */

    const options = {
        selectableRows: "none",
        download: false,
        print: false,
        viewColumns: false,
        filter: true,
        count: count,
        page: page,
        serverSide: true,
        rowsPerPage: 10,
        rowsPerPageOptions: [],
        searchText,
        onSearchChange: (searchQuery) => {
            setSearchText(searchQuery)
        },
        onColumnSortChange: (changedColumn, direction) => {
            sort(changedColumn, direction);
        },
        onTableInit: (action, tableState) => {
            setTableData(tableState)
        },
        onTableChange: (action, tableState) => {
            const tblAction = ['sort', 'changePage', 'search', 'changeRowsPerPage', 'filterChange', 'resetFilters']
            if (tblAction.includes(action)) {
                setTableData(tableState)
            }
        },
        customToolbar: () => {
            return (<><a>
                <Tooltip title={"Add new"} onClick={handleOpen}><IconButton >
                    <AddIcon />
                </IconButton></Tooltip></a>
            </>);
        }
    };

    /**
     * Configure column data
     */
    const columns = [
        {
            label: "Ticket No",
            name: "ticket_no",
            options: {
                filter: false,
                sortOrder: columnSortDirection[0],
            },
        },
        {
            label: "Description",
            name: "ticket_desc",
            options: {
                filter: false,
                sortOrder: columnSortDirection[1],
            },
        },
        {
            label: "Created By",
            name: "first_name",
            options: {
                customBodyRender: (value, tableMeta) => {
                    const { rowData } = tableMeta;
                    return `${rowData[2]} ${rowData[3]}`
                },
                sortOrder: columnSortDirection[2],
            },
        },
        {
            name: "last_name",
            options: {
                display: false,
                filter: false,
            },
        },
        {
            label: "Created At",
            name: "created_at",
            options: {
                filter: false,
                customBodyRender: (value) => {
                    if (value !== undefined) {
                        const localDate = moment
                            .utc(value)
                            .local()
                            .format("DD-MM-YYYY hh:mm:s A");
                        return localDate;
                    }
                    return "";
                },
                sortOrder: columnSortDirection[3],
            },
        },
    ];

    return (<div className="col-xl-12 m-5">

        <MUIDataTable
            title={"Ticket List"}
            data={data}
            columns={columns}
            options={options}
        />
        <Modal
            show={show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Ticket
                        </Modal.Title>
            </Modal.Header>
            <Form ref={fromRef} noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Ticket Description</Form.Label>
                        <Form.Control
                            name="ticket_desc"
                            as="textarea"
                            onChange={handleDescChange}
                            value={ticket_desc_val}
                            rows={5} />
                    </Form.Group>
                    {validator.message("ticket_desc", ticket_desc_val, "required|min:10")}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit} >Add Ticket</Button>
                    <Button variant="danger" onClick={handleClose} >Close</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </div>
    )
}

export default connect('', {
    addTicket,
})(Tickets);