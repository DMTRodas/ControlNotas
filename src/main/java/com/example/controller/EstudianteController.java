package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.model.Estudiante;
import com.example.repository.EstudianteRepository;
import com.example.ResourceNotFoundException.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:5173")  // Permite solicitudes desde el frontend
@RestController
@RequestMapping("/api/estudiantes")
public class EstudianteController {

    @Autowired
    private EstudianteRepository estudianteRepository;

    // Obtener todas las notas de estudiantes
    @GetMapping
    public List<Estudiante> getAllEstudiantes() {
        return estudianteRepository.findAll();
    }

    // Crear un nuevo estudiante
    @PostMapping
    public Estudiante createEstudiante(@RequestBody Estudiante nuevoEstudiante) {
        return estudianteRepository.save(nuevoEstudiante);
    }

    // Actualizar un estudiante existente
    @PutMapping("/{id}")
    public ResponseEntity<Estudiante> updateEstudiante(@PathVariable Long id, @RequestBody Estudiante estudianteDetalles) {
        Estudiante estudiante = estudianteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró el estudiante con ID: " + id));

        // Actualizar campos del estudiante
        estudiante.setNombre(estudianteDetalles.getNombre());
        estudiante.setApellido(estudianteDetalles.getApellido());
        estudiante.setActividades(estudianteDetalles.getActividades());
        estudiante.setPrimerParcial(estudianteDetalles.getPrimerParcial());
        estudiante.setSegundoParcial(estudianteDetalles.getSegundoParcial());
        estudiante.setExamenFinal(estudianteDetalles.getExamenFinal());

        Estudiante estudianteActualizado = estudianteRepository.save(estudiante);
        return ResponseEntity.ok(estudianteActualizado);
    }

    // Eliminar un estudiante
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEstudiante(@PathVariable Long id) {
        Estudiante estudiante = estudianteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No se encontró el estudiante con ID: " + id));

        estudianteRepository.delete(estudiante);
        return ResponseEntity.ok().build();
    }

    // Buscar estudiantes por nombre
    @GetMapping("/buscar")
    public ResponseEntity<List<Estudiante>> buscarEstudiantes(@RequestParam String nombre) {
        List<Estudiante> estudiantes = estudianteRepository.findByNombreContainingIgnoreCase(nombre);
        return ResponseEntity.ok(estudiantes);
    }
}
