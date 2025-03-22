import React from "react";
import img from '../img/loginBackground.png';
import { useNavigate } from "react-router-dom";

export function Users () {
    const navigate = useNavigate();

    const handleUpdate = () => {
        navigate('/update');
    }

    const handleDelete = () => {
        navigate('/delete');
    }

    const handleVolver = () => {
        navigate('/');
    }
    return (
        <main>
            <div>
                <form className="showUser"> 
                    <div className="row-div">
                        <button className="btn-volver" onClick={handleVolver}>Volver</button>
                    </div>
                    <h3>Hola react</h3>
                    <div className="row">
                        <label>Nombre: Pedro Antonio</label>
                        <label>Apellido: Clemente Doria</label>
                    </div>
                    <div className="row">
                        <label>Correo: pedroclemente2209@gmail.com</label>
                        <label>Dirección: Cll 52 Sur #78j - 15</label>
                    </div>
                    <div className="row">
                        <img className="img" src={img} alt="" />
                    </div>
                    <div className="row">
                        <button className="actualizar" onClick={handleUpdate}> Actualizar </button>
                        <button className="eliminar" onClick={handleDelete}> Eliminar </button>
                    </div>
                </form>
            </div>
        </main>
    )
}