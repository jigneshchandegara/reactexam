import axios from "axios";
import React, { useEffect, useRef, useState } from "react";


const Apicrud = () => {


    let [book, setbook] = useState([]);
    let [updata, setupdata] = useState({});
    let [searchdata , setSearch]=useState(""); 

    let Name = useRef();
    let Topice = useRef();
    let Authod = useRef();

    //get data
    const getdata = () => {
        axios.get("http://localhost:4000/book").then((res) => {
            setbook(res.data);
        })
    }

    //add data
    const adddata = () => {
        let parson = {
            Name: Name.current.value,
            Topice: Topice.current.value,
            Authod: Authod.current.value
        };
        axios.post("http://localhost:4000/book", parson).then((response) => {
            console.log(response.data);
            Name.current.value = "";
            Topice.current.value = "";
            Authod.current.value = "";
            setbook([...book, response.data])
        })
    }

    // delete data 
    const deletedata = (id) => {
        axios.delete(`http://localhost:4000/book/${id}`).then((result) => {
            console.log(result.data);
            setbook(book.filter((val) => val.id !== id));
        })
    }

    // updata  data 
    const viewAll = (index) => {
        console.log(index);
        let view = book[index];
        setupdata(view);
    }

    const viewupdata = (e) => {
        setupdata({...updata,[e.target.name]:e.target.value})
        console.log(updata, "updata");
    }
    
    const save = () =>{
        axios.put(`http://localhost:4000/book/${updata.id}`,updata).then((res)=>{
            console.log(res.data,"viewupdata");

            setbook(book.map((value,index) =>{
                if(value.id === res.data.id){
                    return  res.data;
                }else{
                    return value;
                }
            }))
        })
    }

    useEffect(() => {
        getdata();
    }, [])  

    const search = (e) => {
        setSearch(e.target.value);
    };

    const filteredBooks = book.filter(b => {
        return b.Name.toLowerCase().includes(searchdata.toLowerCase())
    });

    return (
        <>
            <input type="text" placeholder="enter book Name" name="Name" ref={Name} />
            <input type="text" placeholder="Enter book Topice" name="Topice" ref={Topice} />
            <input type="Authod" placeholder="enter your Authod" name="Authod" ref={Authod} />
            <button onClick={adddata}>Add</button>
            <input type="text" onChange={search} name="search" value={searchdata}  placeholder='Search'/>

            <table cellpadding="10px" className="col-12 text-center table-bordered  border-secondary">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Topice</th>
                        <th>Authod</th>
                        <th>Updta</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredBooks.map((value, index) => {
                            return (
                                <tr>
                                    <td>{index}</td>
                                    <td>{value.Name}</td>
                                    <td>{value.Topice}</td>
                                    <td>{value.Authod}</td>
                                    <td><button onClick={() => deletedata(value.id)}>deletedata</button></td>
                                    <td><button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => viewAll(index)}>Updata</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-Name" id="exampleModalLabel">Modal Name</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div >
                            <input type="text" placeholder="enter your Name" name="Name" value = {updata.Name} onChange={viewupdata}/><br />
                            <input type="Topice" placeholder="Enter Your Topice" name="Topice" value = {updata.Topice} onChange={viewupdata} /><br />
                            <input type="Authod" placeholder="enter your Authod" name="Authod" value = {updata.Authod} onChange={viewupdata} /><br />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={save}>save</button>
                           
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Apicrud;