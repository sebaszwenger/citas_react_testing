import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

test("<App /> la aplicacion funciona bien la primera vez", () => {
  render(<App />);

  //Heading
  expect(screen.getByText("Administrador de Pacientes")).toBeInTheDocument();

  const titulo = screen.getByTestId("tituloApp");
  expect(titulo.tagName).toBe("H1");
  expect(titulo.tagName).not.toBe("H2");
  expect(titulo.textContent).toBe("Administrador de Pacientes");

  expect(screen.getByText("Crear Cita")).toBeInTheDocument();
  expect(screen.getByText("No hay citas")).toBeInTheDocument();
});

test("<App /> Agregar una cita y verificar el heading", () => {
  render(<App />);

  userEvent.type(screen.getByTestId("mascota"), "Hook");
  userEvent.type(screen.getByTestId("propietario"), "Seba");
  userEvent.type(screen.getByTestId("fecha"), "1980-11-11");
  userEvent.type(screen.getByTestId("hora"), "22:00");
  userEvent.type(screen.getByTestId("sintomas"), "no come");

  const btnSubmit = screen.getByTestId("btn-submit");
  userEvent.click(btnSubmit);

  //Revisar por alerta
  const alerta = screen.queryByTestId("alerta");
  expect(alerta).not.toBeInTheDocument();

  //Revisar por el titulo dinamico
  expect(screen.getByTestId("titulo-dinamico").textContent).toBe(
    "Administra tus Citas"
  );
  expect(screen.getByTestId("titulo-dinamico").textContent).not.toBe(
    "No hay citas"
  );
});

test("<App /> Verificar las CItas en el DOM", async () => {
  render(<App />);

  const citas = await screen.findAllByTestId("cita");
  //Snapshot crea un archivo para verificar su contenido
  //expect(citas).toMatchSnapshot();

  const btnEliminar = screen.getByTestId("btn-eliminar");
  expect(btnEliminar.tagName).toBe("BUTTON");
  expect(btnEliminar).toBeInTheDocument();

  //Verificar alguna cita
  expect(screen.getByText("Hook")).toBeInTheDocument();
});

test("<App /> Verifica que se elimina una cita", () => {
  render(<App />);

  //verifica que existe el boton eliminar
  const btnEliminar = screen.getByTestId("btn-eliminar");
  expect(btnEliminar.tagName).toBe("BUTTON");
  expect(btnEliminar).toBeInTheDocument();

  //Simulamos el click
  userEvent.click(btnEliminar);

  //Verificamos que el boton eliminar ya no exista
  expect(btnEliminar).not.toBeInTheDocument();

  //Verificamos quela cita ya no exista
  expect(screen.queryByTestId("Hook")).not.toBeInTheDocument();
  expect(screen.queryByTestId("cita")).not.toBeInTheDocument();
});
