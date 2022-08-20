import React from "react";
import { render, screen } from "@testing-library/react";
import Formulario from "../components/Formulario";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

const crearCita = jest.fn();

test("<Formulario /> Cargar el formulario y revisar que todo sea correcto", () => {
  //   const wrapper = render(<Formulario />); // muestra el html del componente
  //   wrapper.debug();

  render(<Formulario crearCita={crearCita} />);

  //Verifica que el Heading exista
  expect(screen.getByText("Crear Cita")).toBeInTheDocument();

  //Verifica que la etiqueta y contenido del heading
  const titulo = screen.getByTestId("titulo");
  expect(titulo.tagName).toBe("H2");
  expect(titulo.tagName).not.toBe("H1");
  expect(titulo.textContent).toBe("Crear Cita");

  //Verifica el boton de submit
  const btnSubmit = screen.getByTestId("btn-submit");
  expect(btnSubmit.tagName).toBe("BUTTON");
  expect(btnSubmit.textContent).toBe("Agregar Cita");
  expect(btnSubmit.textContent).not.toBe("Agregar nueva Cita");
});

test("<Formulario /> Validacion de formulario", () => {
  render(<Formulario crearCita={crearCita} />);

  //Simula click en boton
  const btnSubmit = screen.getByTestId("btn-submit");
  //   fireEvent.click(btnSubmit); //metodo viejo
  userEvent.click(btnSubmit);

  //Revisar por alerta
  const alerta = screen.getByTestId("alerta");
  expect(alerta).toBeInTheDocument();
  expect(alerta.tagName).toBe("P");
  expect(alerta.tagName).not.toBe("H2");
  expect(alerta.textContent).toBe("Todos los campos son obligatorios");
});

test("<Formulario /> Validacion de formulario", () => {
  render(<Formulario crearCita={crearCita} />);

  //Rellena el formulario
  userEvent.type(screen.getByTestId("mascota"), "Hook");
  userEvent.type(screen.getByTestId("propietario"), "Seba");
  userEvent.type(screen.getByTestId("fecha"), "1980-11-11");
  userEvent.type(screen.getByTestId("hora"), "22:00");
  userEvent.type(screen.getByTestId("sintomas"), "no come");

  //Metodo viejo (obsoleto)
  //   fireEvent.change(screen.getByTestId("mascota"), {
  //     target: { value: "Hook" },
  //   });

  //   fireEvent.change(screen.getByTestId("propietario"), {
  //     target: { value: "Seba" },
  //   });

  //Simula click
  const btnSubmit = screen.getByTestId("btn-submit");
  userEvent.click(btnSubmit);

  //Revisar por alerta
  const alerta = screen.queryByTestId("alerta");
  expect(alerta).not.toBeInTheDocument();

  //Revisar que se resetee el formulario
  expect(screen.getByTestId("mascota").textContent).toBe("");
  expect(screen.getByTestId("propietario").textContent).toBe("");
  expect(screen.getByTestId("fecha").textContent).toBe("");
  expect(screen.getByTestId("hora").textContent).toBe("");
  expect(screen.getByTestId("sintomas").textContent).toBe("");

  //Crear cita y comprobar que la funcion se haya llamado
  expect(crearCita).toHaveBeenCalled();
  expect(crearCita).toHaveBeenCalledTimes(1);
});
