import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { Container,Row,Col,Form,Table ,Button, Card, InputGroup, Stack} from "react-bootstrap";
import { useRef } from 'react';

export default function MyForm(){

    const[name,setName] = useState();
    const[age,setAge] = useState();
    const[gender,setGender] = useState();
    const[color,setColor] = useState([]);
    const[username,setUsername] = useState();
    const[password,setPassword] = useState();
    const[search,setSearch] = useState();
    const[Data,setdata] = useState([]);
    const[change,setChange] = useState(true);
    const [isEditable,setisEditable]=useState(false);
    const [selectedId, setSelectedId] = useState();
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);


    const handleColor = (e) => {
        const {value,Checked} = e.target;
        const Color = [...color]
        if(Checked){
            Color.push(value)
        }else{
            const index = Color.indexOf(value)
            if(index !== -1){
                Color.splice(index,1)
            }
        }
        setColor(Color)
    };

    const fetchdata=(e)=>{
      axios.get("http://localhost:4000/user/work")
        .then((res) => {
            setdata(res.data)
          console.log(res.data);
          });
    }
     
    useEffect(() => {
        fetchdata();
    }, []);
    
 
    const insertData = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/user/work', {
                Name: name,
                Age: age,
                Gender: gender,
                Color: color,
                Username: username,
                Password: password
            })
            
            .then((res) => {
                console.log(res.data);
                fetchdata();
                setName("");
                setAge("");
                setGender("");
                setUsername("");
                setPassword("");  
                setColor([]);
                ref1.current.checked = false;
                ref2.current.checked = false;
                ref3.current.checked = false;
                ref4.current.checked = false;
                ref5.current.checked = false;
                ref6.current.checked = false;
            });
    };


    const handleUpdate = (_id) => {
        
       const data1 = Data.find((user)=>user._id ==_id)
       console.log(name);
       setChange(false)
       setisEditable(true)
       setSelectedId(_id)
       setName(data1.Name)
       setAge(data1.Age)
       setGender(data1.Gender)
       setColor(data1.Color)
       setUsername(data1.Username)
       setPassword(data1.Password)
      
    };
    
    const updatedata = (e) =>{
        e.preventDefault();
        console.log(selectedId)
        axios
        .put(`http://localhost:4000/user/work?id=${selectedId}`,{
            Name:name,
            Age:age,
            Gender:gender,
            Color:color,
            Username:username,
            Password:password
        })
        .then((res) => {
            fetchdata();
            setChange(true);
            setisEditable(false);
            setSelectedId(null);
            setName("");
            setAge("");
            setGender("");
            setColor([]);
            setUsername("");
            setPassword("");  
            ref1.current.checked = false;
            ref2.current.checked = false;
            ref3.current.checked = false;
            ref4.current.checked = false;
            ref5.current.checked = false;
            ref6.current.checked = false;
        })
        .catch((error) => {
            console.error('Error updating data: ', error);
        });

    }
    

    const deleteall = (id) => {
        axios
            .delete('http://localhost:4000/user/work/deleteall:id')
            .then((res) => {
                fetchdata();
            });
    };

  
    const handleDelete = (id) => {
        console.log(id)
        axios
            .delete(`http://localhost:4000/user/work?id=${id}`)
            .then((res) => {
                fetchdata();
            });
    };

    const finddata = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:4000/user/work/find?id=${[search]}`)
            .then((res) => {
                console.log(res.data);
                
            })
            .catch((err) => {
                console.error('Error:', err);
            });
    }
    
    return(
        <Container  fluid  className='mt-4 '  >
           <Row>
                <Col lg="4" md="4" sm="12">
                    <Card>
                        <Form noValidate className='bg-light shadow' >
                            <Container>
                                <Stack gap={3}>
                                    <h3 className='text-center mt-3'>Register Data</h3>
                                    <Form.Group>
                                        <InputGroup >
                                            <InputGroup.Text className='pe-3 bg-light'>Name</InputGroup.Text>
                                            <Form.Control type="text" placeholder='type here.....' value={name} onChange={(update)=>setName(update.target.value)} required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid state.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                        <InputGroup >
                                            <InputGroup.Text className='pe-4 bg-light'><span className='pe-2'>Age</span></InputGroup.Text>
                                            <Form.Select value={age}  onChange={(update)=>setAge(update.target.value)} >
                                                <option selected>Select Age</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                            </Form.Select>
                                            
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                        <InputGroup>
                                            <InputGroup.Text className='bg-light'>Gender</InputGroup.Text>
                                                <Form.Check type='radio' ref={ref4} className='mt-2 ms-2' label={'Male'}  name='gender' value="Male" checked={gender=="Male"}  onChange={(update)=>setGender(update.target.value)} />
                                                <Form.Check type='radio' ref={ref5} className='mt-2 ms-2' label={'Female'} name='gender' value="Female" checked={gender=="Female"} onChange={(update)=>setGender(update.target.value)} />
                                                <Form.Check type='radio' ref={ref6} className='mt-2 ms-2' label={'Other'} name='gender' value="Other" checked={gender=="other"} onChange={(update)=>setGender(update.target.value)} />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid state.
                                                </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                        <InputGroup>
                                        <InputGroup.Text className='pe-4 bg-light'>Color</InputGroup.Text>
                                            <Form.Check className='mt-2 ms-2' ref={ref1} label="Red" name='color1'  value="Red"  checked={color.includes('Red')} onChange={handleColor}/>
                                            <Form.Check className='mt-2 ms-2' ref={ref2} label="Green" name='color2' value="Green"  checked={color.includes('Green')} onChange={handleColor}/>
                                            <Form.Check className='mt-2 ms-2' ref={ref3} label="Yellow" name='color3' value="Yellow"  checked={color.includes('Yellow')} onChange={handleColor}/>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid state.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                        <InputGroup >
                                            <InputGroup.Text className='bg-light'>Username</InputGroup.Text>
                                            <Form.Control type="text" placeholder='type here..... ' value={username} onChange={(update)=>setUsername(update.target.value)} required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid state.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group>
                                        <InputGroup >
                                            <InputGroup.Text className='bg-light'>Password</InputGroup.Text>
                                            <Form.Control type="password" placeholder='type here..... ' value={password} onChange={(update)=>setPassword(update.target.value)} required/>
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid state.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                            
                                    <div className='d-grid mb-3'>  
                                        {change ? <Button type="submit" onClick={insertData}>Submit</Button> : <Button type="submit" onClick={updatedata}>Update</Button>}
                                    </div>
                                </Stack>
                            </Container>
                        </Form>
                    </Card>
                </Col>
                <Col>
                    <Form onSubmit={finddata}>
                        <Form.Group as={Row} className=' d-flex flex-row  mb-3'>
                            <Col>
                                <Form.Control type='text' placeholder='Search'   onChange={(e)=>setSearch(e.target.value)}/>
                            </Col>
                            <Col>
                                <Button className='' type='submit' >Search</Button>
                            </Col>
                            <Col>
                                <Button onClick={deleteall} className='float-end'>Delete ALL</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                    <div className='overflow-auto ' style={{maxHeight:"375px"}}>

                    <Table responsive borderless hover className='text-center shadow  '>
                                <thead className=' table-dark'>
                                    <tr>
                                        <th >Id</th>
                                        <th >Name</th>
                                        <th >Age</th>
                                        <th >Gender</th>
                                        <th >Color</th>
                                        <th >Username</th>
                                        <th >Password</th>
                                        <th >Edit</th>
                                        <th >Delete</th>
                                    </tr>
                                </thead>                                
                            <tbody className='table-secondary table-bordered'>
                            {Data.map((info, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td >{info.Name}</td>
                                            <td>{info.Age}</td>
                                            <td>{info.Gender}</td>
                                            <td>{info.Color.join(" , ")}</td>
                                            <td>{info.Username}</td>
                                            <td>{info.Password}</td>
                                            <td><i onClick={()=>handleUpdate(info._id,info.Name)} className='curser fa fa-edit text-primary' style={{cursor:'pointer'}}></i></td>
                                            <td><i onClick={()=>handleDelete(info._id)} className="fa fa-trash text-danger" style={{cursor:'pointer'}}></i></td>
                                        </tr>
                                    ))}
                            </tbody>
                    </Table>
                    </div>

                </Col>
           </Row>
        </Container>
        
    )
}