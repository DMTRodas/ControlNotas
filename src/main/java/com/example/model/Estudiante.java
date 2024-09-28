package com.example.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "estudiantes")
public class Estudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_estudiante")
    private String nombre;

    @Column(name = "apellido_estudiante")
    private String apellido;

    // Máximos permitidos para cada parámetro
    private static final int MAX_ACTIVIDADES = 35;
    private static final int MAX_PRIMER_PARCIAL = 15;
    private static final int MAX_SEGUNDO_PARCIAL = 15;
    private static final int MAX_EXAMEN_FINAL = 35;

    private int actividades;
    private int primerParcial;
    private int segundoParcial;
    private int examenFinal;

    // Getters
    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public int getActividades() {
        return actividades;
    }

    public int getPrimerParcial() {
        return primerParcial;
    }

    public int getSegundoParcial() {
        return segundoParcial;
    }

    public int getExamenFinal() {
        return examenFinal;
    }

    // Setters con validaciones

    public void setNombre(String nombre){
        this.nombre = nombre;
    }

    public void setApellido(String apellido){
        this.apellido = apellido;
    }

    public void setActividades(int actividades) {
        if (actividades <= MAX_ACTIVIDADES) {
            this.actividades = actividades;
        } else {
            throw new IllegalArgumentException("La puntuación de actividades no puede exceder " + MAX_ACTIVIDADES + " puntos.");
        }
    }

    public void setPrimerParcial(int primerParcial) {
        if (primerParcial <= MAX_PRIMER_PARCIAL) {
            this.primerParcial = primerParcial;
        } else {
            throw new IllegalArgumentException("La puntuación del primer parcial no puede exceder " + MAX_PRIMER_PARCIAL + " puntos.");
        }
    }

    public void setSegundoParcial(int segundoParcial) {
        if (segundoParcial <= MAX_SEGUNDO_PARCIAL) {
            this.segundoParcial = segundoParcial;
        } else {
            throw new IllegalArgumentException("La puntuación del segundo parcial no puede exceder " + MAX_SEGUNDO_PARCIAL + " puntos.");
        }
    }

    public void setExamenFinal(int examenFinal) {
        if (examenFinal <= MAX_EXAMEN_FINAL) {
            this.examenFinal = examenFinal;
        } else {
            throw new IllegalArgumentException("La puntuación del examen final no puede exceder " + MAX_EXAMEN_FINAL + " puntos.");
        }
    }

    // Método para calcular la nota final
    public int calcularNotaFinal() {
        return (int) (actividades * 0.2 + primerParcial * 0.3 + segundoParcial * 0.3 + examenFinal * 0.2);
    }
}
