import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button,Container,Row,Col,Form,Stack, Modal, ModalHeader, ModalBody, Table, Toast, ToastBody, ToastContainer } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import './Validate.css'

export default function Welcome(){

    const[ID,setid] = useState();
    const[name,setName] = useState();
    const[age,setAge] = useState();
    const[phone,setPhone] = useState();
    const[username,setUsername] = useState();
    const[password,setPassword] = useState();

    // boolean for ternary condition start

        // using too show the Login userDetasils 
        const[show,setShow] = useState(false);
        // using to edit the Login userdetails
        const[change,SetChange] = useState(true);
        const[change2,SetChange2] = useState(false);
        // showing toaster message after edited
        const[visible,setVisible] = useState(false)
    
        //show the table details model
        const[view,setView] = useState(false)
        // using to edit in table data 
        const[showstudentdetails,setShowstuDentdetails] = useState(true)
        const[editstudentdetails,setEditstuDentdetails] = useState(false)

        // delete confirmation model 
        const[showdelete,setShowDelete] = useState(false)

    // boolean for ternary condition end

    // Position for toaster start

    const[position,setPosition] = useState('middle-center')
    const[position1,setPosition1] = useState('middle-center')
    
    // Position for toaster end

    // after fetch the data stored in this state
    const[store,setStore] = useState([]);
    const[Catchview,setCatchView] = useState([]);
    
    // stored data in localstorage 
    const data = JSON.parse(localStorage.getItem("store"))

    //find a particular data using id
    const found = store.find((item)=>item._id == data._id)

    // hook method in router
    const navigate = useNavigate();

    // for model show and close
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const hidedetails = () => setView(false)

    // Delete confirmaton toaster close
    const toggleclose = () => setShowDelete(false);



    // Fetch the data using useEffect start
    
    const fetch =() =>{

        axios.get(`http://localhost:4000/login/catch`)
         .then((res)=>{
            setStore(res.data)

         })
         

    }
    
    // Fetch the data using useEffect end
    useEffect(() => {
        fetch();
    }, []);

   

    // logout function start

    if(!found || !data){
        navigate('/')
        return null;
    }

    const gotologin = (e) =>{
        navigate('/',{replace:true})
        localStorage.removeItem("store")
        
    }

    // logout function end

    // Model footer back Button start

    const backtodata = (e) =>{
        e.preventDefault();
        SetChange(true)
        SetChange2(false)
    }

    // Model footer back Button end

    // Edit User Data in Form start
    const editdata = (e) =>{
        // get the data using id
        e.preventDefault();
        SetChange(false)
        SetChange2(true)
        setName(found.Name)
        setAge(found.Age)
        setPhone(found.Phone)
        setUsername(found.Username)
        setPassword(found.Password)
    }

    const updatedata = (e) =>{
        // update the data using the id
        e.preventDefault();
        axios.put(`http://localhost:4000/login/update?id=${data._id}`,{
            Name:name,
            Age:age,
            Phone:phone,
            Username:username,
            Password:password
            })
            .then((res)=>{
                console.log(res.data)
                setName("");
                setAge("");
                setPhone("");
                setUsername("");
                setPassword("");
                SetChange(true)
                SetChange2(false)
                fetch();
                setVisible(true)
                setTimeout(() => {
                    setVisible(false)
                }, 3000);

            })
    }

    // Edit User Data in Form end

    // Edit the table data start 

    const editstudentinfo = (e) => {
        e.preventDefault();
        setShowstuDentdetails(false)
        setEditstuDentdetails(true)

    }

    // Confirmation for delete data in table start

    const confirmation = (id) => {
        setid(id)
        setShowDelete(true)
    };

    const deletedata = (e) =>{
        e.preventDefault();
        axios
            .delete(`http://localhost:4000/login/delete?id=${ID}`)
            .then((res) => {
                fetch();
                setShowDelete(false)
            });
    }

    // Confirmation for delete data in table start

    // Table data edit function start

    const updatechanges = (e) =>{
        e.preventDefault();
        axios.put(`http://localhost:4000/login/update?id=${ID}`,{
            Name:name,
            Age:age,
            Phone:phone,
            Username:username,
            Password:password
            })
            .then((res)=>{
                console.log(res.data)
                setid("")
                setName("");
                setAge("");
                setPhone("");
                setUsername("");
                setPassword("");
                // setShow1(true)
                // setShow2(false)
                fetch();

            })
    }

    // Table data edit function end

    // Table data edit back function start
    
    // const discard = (e) =>{
    //     e.preventDefault();
    //     setShow1(true);
    //     setShow2(false);
    // }

    // Table data edit back function end

    // Table data view start

    const viewdata = (id) =>{
        setView(true)
        const getdatatoview = store.find((student)=>student._id == id)
        setCatchView(getdatatoview)

    }
    
    return(
      <>
            <div className="bg-image ">
                {/* Welcome page start */}
                
                {/* {show1 && 
                <> */}
                <Row>
                    <Col></Col>
                    
                    <Col lg={10} md={10} sm={10}>
                        <h3 className="text-center">Welcome to <span className="text-success fw-bold fs-1">Legends</span> Tech Solution</h3>
                    </Col>

                    <Col >
                        <img src={require("./img/userlogo.png")} className="mt-2 float-end me-3"  onClick={handleShow} style={{cursor:'pointer'}} roundedCircle width={"30"} height={"30"} />
                        
                    {/* Model for User Details start */}

                        <Modal show={show} onHide={handleClose} aria-labelledby="tabledata" backdrop="static" >
                            <ModalHeader closeButton id="tabledata">
                                <Modal.Title>User Details</Modal.Title>
                            </ModalHeader>
                            <ModalBody>
                                {change && 
                                <Form>
                                    <Stack gap={3} className="mb-3">
                                        <Form.Group as={Row}>
                                                    <Form.Label column lg={2} className="fw-bold">Name</Form.Label>
                                                    <Col lg={8}>
                                                        <Form.Control type="text" value={found?.Name} plaintext readOnly />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid state.
                                                        </Form.Control.Feedback>
                                                    </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                                    <Form.Label column lg={2} className="fw-bold">Age</Form.Label>
                                                    <Col lg={8}>
                                                        <Form.Control type="text" value={found?.Age} plaintext readOnly />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid state.
                                                        </Form.Control.Feedback>
                                                    </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                                    <Form.Label column lg={2} className="fw-bold">Phone</Form.Label> 
                                                    <Col lg={8}>
                                                        <Form.Control type="text" value={found?.Phone} plaintext readOnly/>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid state.
                                                        </Form.Control.Feedback>
                                                    </Col>
                                        </Form.Group>
                                    </Stack>
                                    <Button className="fw-bold" variant="outline-info" style={{fontSize:'14px',cursor:'pointer'}} onClick={editdata}>Edit</Button>
                                </Form>}
                                {change2 && 
                                <Form>
                                    <Stack gap={3}>
                                        <Form.Group as={Row}>
                                                    <Form.Label column lg={2} className="fw-bold">Name</Form.Label>
                                                    <Col lg={8}>
                                                        <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)}  />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid state.
                                                        </Form.Control.Feedback>
                                                    </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                                    <Form.Label column lg={2} className="fw-bold">Age</Form.Label>
                                                    <Col lg={8}>
                                                        <Form.Control type="text" value={age} onChange={(e)=>setAge(e.target.value) }/>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid state.
                                                        </Form.Control.Feedback>
                                                    </Col>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                                    <Form.Label column lg={2} className="fw-bold">Phone</Form.Label> 
                                                    <Col lg={8}>
                                                        <Form.Control type="text" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid state.
                                                        </Form.Control.Feedback>
                                                    </Col>
                                        </Form.Group>
                                    </Stack>
                                </Form>}
                            
                            </ModalBody>
                            <Modal.Footer>
                                {change2 ? <Button type="button" variant="outline-secondary fw-bold" onClick={backtodata}>Back</Button> : <Button variant="outline-danger" className="mt-2  fw-bold" onClick={gotologin}><span className="">LogOut</span></Button>}
                                {change2 ?  <Button type="button"  variant="outline-primary" className=" fw-bold" onClick={updatedata} >Update</Button> : null} 

                            </Modal.Footer>

                            {/* Toaster for after edit msg start */}
                            <ToastContainer position={position} className="">
                                <Toast show={visible}  >
                                    <ToastBody >
                                        <p className="text-success text-center fw-bold pt-3">Data Updated Successfuly!</p>
                                    </ToastBody>
                                </Toast>
                            </ToastContainer>
                            {/* Toaster for after edit msg start */}

                        </Modal>

                    {/* Model for User Details end */}

                    </Col>
                </Row>
                
                <div className="m-2">
                    <p className="text-center text-info mt-3 fs-1 ">Hello!<span className="text-primary fw-bold fs-2"> {found?.Name}</span></p>
                </div>
                <Container>
                    <p className="fs-2 text-warning fw-bold text-center">User Data</p>

                {/* Showing user data in table start */}

                <Table responsive borderless hover className='text-center shadow '>
                                <thead className=' table-dark'>
                                    <tr>
                                        <th >Id</th>
                                        <th >Name</th>
                                        <th >Age</th>
                                        <th >Phone</th>
                                        <th >Username</th>
                                        <th >View</th>
                                        <th >Delete</th>
                                    </tr>
                                </thead>                                
                            <tbody className='table-light  table-bordered'>
                            {store.map((info, index) => (
                                        <tr key={index} >
                                            <td>{index + 1}</td>
                                            <td >{info.Name}</td>
                                            <td>{info.Age}</td>
                                            <td>{info.Phone}</td>
                                            <td>{info.Username}</td>
                                            <td><i onClick={()=>viewdata(info._id)} className='curser fa fa-eye text-primary' style={{cursor:'pointer'}}></i></td>
                                            
                                            {/* Model For View Page start */}
                                
                                            <Modal show={view} onHide={hidedetails} centered backdrop="static" className="">
                                                <Container>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Student Details</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form>
                                                            <Form.Group as={Row}>
                                                                <Form.Label column className="fw-bold">Name</Form.Label>
                                                                <Col>
                                                                    <Form.Control type="text" value={Catchview?.Name} readOnly plaintext autoFocus />
                                                                </Col>
                                                            </Form.Group>
                                                        </Form>
                                                        <Form>
                                                            <Form.Group as={Row}>
                                                                <Form.Label column className="fw-bold">Name</Form.Label>
                                                                <Col>
                                                                    <Form.Control type="text" value={Catchview?.Name} readOnly plaintext autoFocus />
                                                                </Col>
                                                            </Form.Group>
                                                        </Form>
                                                        <Form>
                                                            <Form.Group as={Row}>
                                                                <Form.Label column className="fw-bold">Name</Form.Label>
                                                                <Col>
                                                                    <Form.Control type="text" value={Catchview?.Name} readOnly plaintext autoFocus />
                                                                </Col>
                                                            </Form.Group>
                                                        </Form>
                                                        <Form>
                                                            <Form.Group as={Row}>
                                                                <Form.Label column className="fw-bold">Name</Form.Label>
                                                                <Col>
                                                                    <Form.Control type="text" value={Catchview?.Name} readOnly plaintext autoFocus />
                                                                </Col>
                                                            </Form.Group>
                                                        </Form>
                                                        <Form>
                                                            <Form.Group as={Row}>
                                                                <Form.Label column className="fw-bold">Name</Form.Label>
                                                                <Col>
                                                                    <Form.Control type="text" value={Catchview?.Name} readOnly plaintext autoFocus />
                                                                </Col>
                                                            </Form.Group>
                                                        </Form>
                                                        <Form>
                                                            <Form.Group as={Row}>
                                                                <Form.Label column className="fw-bold">Name</Form.Label>
                                                                <Col>
                                                                    <Form.Control type="text" value={Catchview?.Name} readOnly plaintext autoFocus />
                                                                </Col>
                                                            </Form.Group>
                                                        </Form>
                                                        <Form>
                                                            <Form.Group as={Row}>
                                                                <Form.Label column className="fw-bold">Name</Form.Label>
                                                                <Col>
                                                                    <Form.Control type="text" value={Catchview?.Name} readOnly plaintext autoFocus />
                                                                </Col>
                                                            </Form.Group>
                                                        </Form>
                                                        <Form>
                                                            <Form.Group as={Row}>
                                                                <Form.Label column className="fw-bold">Name</Form.Label>
                                                                <Col>
                                                                    <Form.Control type="text" value={Catchview?.Name} readOnly plaintext autoFocus />
                                                                </Col>
                                                            </Form.Group>
                                                        </Form>
                                                        <Form>
                                                            <Form.Group as={Row}>
                                                                <Form.Label column className="fw-bold">Name</Form.Label>
                                                                <Col>
                                                                    <Form.Control type="text" value={Catchview?.Name} readOnly plaintext autoFocus />
                                                                </Col>
                                                            </Form.Group>
                                                        </Form>
                                                        <Form>
                                                            <Form.Group as={Row}>
                                                                <Form.Label column className="fw-bold">Name</Form.Label>
                                                                <Col>
                                                                    <Form.Control type="text" value={Catchview?.Name} readOnly plaintext autoFocus />
                                                                </Col>
                                                            </Form.Group>
                                                        </Form>
                                                        <Form>
                                                            <Form.Group as={Row}>
                                                                <Form.Label column className="fw-bold">Name</Form.Label>
                                                                <Col>
                                                                    <Form.Control type="text" value={Catchview?.Name} readOnly plaintext autoFocus />
                                                                </Col>
                                                            </Form.Group>
                                                        </Form>
                                                        <Form>
                                                            <Form.Group as={Row}>
                                                                <Form.Label column className="fw-bold">Name</Form.Label>
                                                                <Col>
                                                                    <Form.Control type="text" value={Catchview?.Name} readOnly plaintext autoFocus />
                                                                </Col>
                                                            </Form.Group>
                                                        </Form>
                                                       
                                                    </Modal.Body>
                                                </Container>
                                            </Modal>

                                            {/* Model For View Page end */}

                                            <td><i onClick={()=>confirmation(info._id)} className="fa fa-trash text-danger" style={{cursor:'pointer'}}></i></td>

                                            {/* Modal for confirmation of delete start */}

                                            <Modal show={showdelete} backdrop="static" centered>
                                                <Modal.Body>
                                                    <p className="text-dark text-center fs-3    pb-0">Are you sure You want to delete ?</p>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <div className="d-flex justify-content-end">
                                                        <Button onClick={toggleclose} variant="outline-primary" className="me-2">Close</Button>
                                                        <Button onClick={deletedata} variant="outline-danger" className=" ">Delete</Button>
                                                    </div>
                                                </Modal.Footer>
                                            </Modal>

                                            {/* Modal for confirmation of delete end */}

                                        </tr>
                                    ))}
                            </tbody>
                    </Table>
                
                {/* Showing user data in table end */}

                </Container>
                {/* </> */}

                {/* Table Data edit form start */}

                {/* {show2 && 
                <Container>
                <Row>
                    <Col lg={4} className="position-absolute top-50 start-50 translate-middle">
                        <Card  >
                            <Form  className='bg-light shadow rounded' >
                                <Container>
                                    <Stack gap={3} className="m-4">
                                        <h3 className='text-center mt-3 fs-2'><span className="text-decoration-underline ">Update</span>Your Data</h3>
                                        <Form.Group>
                                            <InputGroup >
                                            <InputGroup.Text ><i className="fa fa-user-circle fs-4"></i></InputGroup.Text>
                                                    <Form.Control type="text" placeholder='Name' value={name} onChange={(update)=>setName(update.target.value)} />
                                                  
                                                </InputGroup>
                                        </Form.Group>
                                        <Form.Group>
                                            <InputGroup >
                                            <InputGroup.Text ><i className="fa fa-vcard-o fs-4"></i></InputGroup.Text>
                                                    <Form.Control type="text" placeholder='Age' value={age} onChange={(update)=>setAge(update.target.value)} />
                                                    
                                                </InputGroup>
                                        </Form.Group>
                                        <Form.Group>
                                            <InputGroup >
                                            <InputGroup.Text ><i className="fa fa-phone ps-2 fs-4"></i></InputGroup.Text>
                                                    <Form.Control type="text" placeholder='Phone' value={phone} onChange={(update)=>setPhone(update.target.value)} />
                                                   
                                                </InputGroup>
                                        </Form.Group>
                                        <Form.Group>
                                            <InputGroup >
                                                <InputGroup.Text><i className="fa fa-user-plus fs-4"></i></InputGroup.Text>
                                                <Form.Control type="text" placeholder='Username' value={username} onChange={(update)=>setUsername(update.target.value)} />
                                                
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group>
                                            <InputGroup >
                                                <InputGroup.Text><i className="fa fa-lock ps-2 fs-4"></i></InputGroup.Text>
                                                <Form.Control type="password" placeholder='Password' value={password} onChange={(update)=>setPassword(update.target.value)} />
                                               
                                            </InputGroup>
                                        </Form.Group>
                                    </Stack>
                                    <div className="d-flex justify-content-center mb-3">
                                        <Button type="submit"  variant="outline-danger" className="m-2" onClick={discard}>Discard</Button> 
                                        <Button type="submit"  variant="outline-primary" className="m-2" onClick={updatechanges}>Save</Button> 
                                    </div>
    
                                </Container>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
            } */}

            {/* Table Data edit form end */}

            </div>
            </>
    )
}