import React from "react";
import { useNavigate } from "react-router-dom";

export function Delete () {
    const navigate = useNavigate();

    const handleVolver = () =>{
        navigate('/users');
    }
    return (
        <main>
            <div>
                <form> 
                    <div className="row-div">
                        <button className="btn-volver-delete" onClick={handleVolver}>Volver</button>
                    </div>
                    <h3>Hola react</h3>
                    <div className="row">
                        <label>Nombre: </label>
                        <input type="number" />
                    </div>
                    <div className="row">
                        <button className="registrar">Eliminar</button>
                        <button className="cancelar">Cancelar</button>
                    </div>
                </form>
            </div>
        </main>
    )
}