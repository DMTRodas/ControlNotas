import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importamos los estilos CSS

function App() {
    const [estudiantes, setEstudiantes] = useState([]);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [actividades, setActividades] = useState("");
    const [primerParcial, setPrimerParcial] = useState("");
    const [segundoParcial, setSegundoParcial] = useState("");
    const [examenFinal, setExamenFinal] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [currentEstudianteId, setCurrentEstudianteId] = useState(null);
    const [searchId, setSearchId] = useState(""); // Estado para el ID de búsqueda
    const [studentDetails, setStudentDetails] = useState(null); // Estado para los detalles del estudiante
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchEstudiantes();
    }, []);

    const fetchEstudiantes = () => {
        axios.get('/api/estudiantes')
            .then(response => setEstudiantes(response.data))
            .catch(error => console.error("Error al obtener los estudiantes: ", error));
    };

    const addEstudiante = () => {
        if (!nombre || !apellido || !actividades || !primerParcial || !segundoParcial || !examenFinal) {
            setErrorMessage("Todos los campos son obligatorios.");
            return;
        }

        setErrorMessage("");

        const nuevoEstudiante = {
            nombre,
            apellido,
            actividades: parseInt(actividades),
            primer_parcial: parseInt(primerParcial),
            segundo_parcial: parseInt(segundoParcial),
            examen_final: parseInt(examenFinal)
        };

        if (editMode) {
            axios.put(`/api/estudiantes/${currentEstudianteId}`, nuevoEstudiante)
                .then(() => {
                    fetchEstudiantes();
                    setEditMode(false);
                    setCurrentEstudianteId(null);
                    clearForm();
                })
                .catch(error => console.error("Error al editar el estudiante: ", error));
        } else {
            axios.post('/api/estudiantes', nuevoEstudiante)
                .then(response => {
                    setEstudiantes([...estudiantes, response.data]);
                    clearForm();
                })
                .catch(error => {
                    console.error("Error al agregar estudiante: ", error.response ? error.response.data : error.message);
                });
                
        }
    };

    const deleteEstudiante = (id) => {
        axios.delete(`/api/estudiantes/${id}`)
            .then(() => {
                setEstudiantes(estudiantes.filter(est => est.id !== id));
            })
            .catch(error => console.error("Error al eliminar el estudiante: ", error));
    };

    const editEstudiante = (estudiante) => {
        setNombre(estudiante.nombre);
        setApellido(estudiante.apellido);
        setActividades(estudiante.actividades);
        setPrimerParcial(estudiante.primer_parcial);
        setSegundoParcial(estudiante.segundo_parcial);
        setExamenFinal(estudiante.examen_final);
        setEditMode(true);
        setCurrentEstudianteId(estudiante.id);
    };

    const cancelEdit = () => {
        clearForm();
        setEditMode(false);
        setCurrentEstudianteId(null);
    };

    const clearForm = () => {
        setNombre("");
        setApellido("");
        setActividades("");
        setPrimerParcial("");
        setSegundoParcial("");
        setExamenFinal("");
        setSearchId(""); // Limpiar ID de búsqueda
        setStudentDetails(null); // Limpiar detalles del estudiante
        setErrorMessage("");
    };

    // Función para buscar estudiante por ID
    const searchStudent = () => {
        if (!searchId) {
            setErrorMessage("Por favor, ingresa un ID.");
            return;
        }

        axios.get(`/api/estudiantes/${searchId}`)
            .then(response => {
                setStudentDetails(response.data);
                setErrorMessage("");
            })
            .catch(error => {
                setErrorMessage("No se encontró el estudiante.");
                setStudentDetails(null);
            });
    };

    return (
        <div className="container">
            <h1>{editMode ? "Editar Estudiante" : "Agregar Estudiante"}</h1>
            <div>
                <input
                    type="text"
                    placeholder="Nombre del estudiante"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Apellido del estudiante"
                    value={apellido}
                    onChange={e => setApellido(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Actividades (máximo 35)"
                    value={actividades}
                    onChange={e => setActividades(e.target.value)}
                    min="0"
                    max="35"
                />
                <input
                    type="number"
                    placeholder="Primer Parcial (máximo 15)"
                    value={primerParcial}
                    onChange={e => setPrimerParcial(e.target.value)}
                    min="0"
                    max="15"
                />
                <input
                    type="number"
                    placeholder="Segundo Parcial (máximo 15)"
                    value={segundoParcial}
                    onChange={e => setSegundoParcial(e.target.value)}
                    min="0"
                    max="15"
                />
                <input
                    type="number"
                    placeholder="Examen Final (máximo 35)"
                    value={examenFinal}
                    onChange={e => setExamenFinal(e.target.value)}
                    min="0"
                    max="35"
                />

                <div>
                    <button onClick={addEstudiante}>
                        {editMode ? "Guardar Cambios" : "Agregar Estudiante"}
                    </button>
                    {editMode && (
                        <button onClick={cancelEdit} style={{ marginLeft: "10px", backgroundColor: "gray" }}>
                            Cancelar
                        </button>
                    )}
                </div>

                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>

            {/* Sección para buscar estudiante por ID */}
            <h1>Buscar Estudiante</h1>
            <input
                type="number"
                placeholder="ID del Estudiante"
                value={searchId}
                onChange={e => setSearchId(e.target.value)}
            />
            <button onClick={searchStudent}>Buscar</button>

            {studentDetails && (
                <div>
                    <h2>Detalles del Estudiante</h2>
                    <p><strong>Nombre:</strong> {studentDetails.nombre}</p>
                    <p><strong>Apellido:</strong> {studentDetails.apellido}</p>
                    <p><strong>Actividades:</strong> {studentDetails.actividades}</p>
                    <p><strong>Primer Parcial:</strong> {studentDetails.primer_parcial}</p>
                    <p><strong>Segundo Parcial:</strong> {studentDetails.segundo_parcial}</p>
                    <p><strong>Examen Final:</strong> {studentDetails.examen_final}</p>
                </div>
            )}

            <h1>Lista de Estudiantes</h1>
            <ul>
                {estudiantes.map(est => (
                    <li key={est.id}>
                        <strong>{est.nombre} {est.apellido}</strong><br />
                        <span>Actividades: {est.actividades}</span><br />
                        <span>Primer Parcial: {est.primer_parcial}</span><br />
                        <span>Segundo Parcial: {est.segundo_parcial}</span><br />
                        <span>Examen Final: {est.examen_final}</span>
                        <br />
                        <button onClick={() => editEstudiante(est)} style={{ marginRight: "10px" }}>Editar</button>
                        <button onClick={() => deleteEstudiante(est.id)} style={{ backgroundColor: "red", color: "white" }}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
