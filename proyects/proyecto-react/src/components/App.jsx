import React from "react";
import { useNavigate } from "react-router-dom";

export function App () {
    const navigate = useNavigate();

    const handleRegistrar = () => {
        navigate('/users');
    }
    return (
        <main>
            <div>
                <form> 
                    <h3>Hola react</h3>
                    <div className="row">
                        <label>Nombre: </label>
                        <input type="text" />
                        <label>Apellido: </label>
                        <input type="text" />
                    </div>
                    <div className="row">
                        <label>Correo: </label>
                        <input type="text" />
                        <label>Dirección: </label>
                        <input type="text" />
                    </div>
                    <div className="row">
                        <label>Imagen: </label>
                        <input type="file" accept=".png, .jpg"/>
                    </div>
                    <div className="row">
                        <button className="registrar" onClick={handleRegistrar}>Registrar</button>
                        <button className="cancelar">Cancelar</button>
                    </div>
                </form>
            </div>
        </main>
    )
}