import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import AuthContext from "../contexts/AuthContext";
import { traerDatosParaVacaciones } from "../services/ServiceConsu";
import { PDFViewer } from "@react-pdf/renderer";
import DocumentLCPdf from "../components/DocumentLCPdf";

const schema = yup
  .object({
    //dias: yup.string().required('dias a justificar es requerido'),
    namejefe: yup.string().required("este campo es requerido"),
  })
  .required();

const FormVacaciones = () => {
  const { legajo, nombre, condi } = useContext(AuthContext);

  const [datosVac, setDatosVac] = useState(null);
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [antiguedad, setAntiguedad] = useState("");
  const [antiguedadReco, setAntiguedadReco] = useState("");
  const [diasVac, setDiasVac] = useState(0);

  const [anioLic, setAnioLic] = useState(2023);
  const [mostrar, setMostrar] = useState(false);

  const [fechaI, setFechaI] = useState("");
  const [fechaF, setFechaF] = useState("");
  const [fechaR, setFechaR] = useState("");
  const [valores, setValores] = useState(null);

  //lectura de datos persona
  useEffect(() => {
    const getDatos = async () => {
      //console.log('Datos')
      setDatosVac(await traerDatosParaVacaciones(legajo));
      //setDatosPer(await traerDatosPersona(legajo))
    };

    getDatos();
  }, [legajo]);

  useEffect(() => {
    const setdatos = () => {
      setDiasVac(datosVac.dias);
      setFechaIngreso(datosVac.fecha_ingreso);
      setAntiguedad(datosVac.antiguedad);
      setAntiguedadReco(datosVac.reconocimiento);
    };

    if (datosVac) {
      setdatos();
    }
  }, [datosVac]);

  //fin tratamiento datos persona

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function convertirfechaI(fe) {
    if (fe !== "") {
      return (
        fe.substring(8, 10) +
        "/" +
        fe.substring(5, 7) +
        "/" +
        fe.substring(0, 4)
      );
    }
  }

  function convertirfecha(fe) {
    if (fe !== "") {
      //console.log(fe)
      let dia =
        new Date(fe).getDate() < 10
          ? "0" + new Date(fe).getDate()
          : new Date(fe).getDate();
      let mes =
        new Date(fe).getMonth() + 1 < 10
          ? "0" + (new Date(fe).getMonth() + 1)
          : new Date(fe).getMonth() + 1;
      //console.log(dia, mes)
      return dia + "/" + mes + "/" + new Date(fe).getFullYear();
    }
  }

  const onHandleChangeFechaI = (e) => {
    setFechaI(e.target.value);
    setAnioLic(new Date().getFullYear());
    //console.log(anioL)
    //console.log(e.target.value)
    let fechaFin = new Date(e.target.value);
    //let fechaFin = new Date(dia.getTime() + diasVac*24*60*60*1000)
    fechaFin.setDate(fechaFin.getDate() + diasVac);

    let fechaReg = new Date(fechaFin.getTime());

    fechaReg = new Date(fechaFin.getTime() + 1 * 24 * 60 * 60 * 1000);

    let diasemana = fechaReg.getDay();
    let n = 1;

    //console.log(fechaI)
    //console.log(diasemana)

    while (diasemana === 0 || diasemana === 6) {
      fechaReg.setDate(fechaReg.getDate() + n);
      diasemana = fechaReg.getDay();

      //console.log(fechaReg,diasemana)
    }

    setFechaF(convertirfecha(fechaFin));
    setFechaR(convertirfecha(fechaReg));
    document.getElementById("fechaF").value = convertirfecha(fechaFin);
    document.getElementById("fechaR").value = convertirfecha(fechaReg);
    //console.log(dia,fechaFin,fechaReg)

    //console.log (fechaReg.getDay())
  };

  /*


   
  */

  const onSubmit = (data) => {
    let datos = {};
    //const resp = await autenticarse(data.legajo,data.password)
    //const resp = await login(data.legajo,data.password)

    datos.legajo = legajo;
    datos.nombre = nombre;
    datos.condi = condi;
    datos.aniosLic = anioLic;
    datos.superior = data.namejefe;
    datos.fechaI = convertirfechaI(fechaI);
    datos.fechaF = fechaF;
    datos.fechaR = fechaR;
    setValores(datos);

    setMostrar(!mostrar);
    //console.log('H',datos)
  };

  const onHandleCerrarPdf = () => {
    setMostrar(!mostrar);
  };

  const onHandleChangename = (e) => {
    //   setDias(e.target.value)
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <h4 className="h5" style={{ textAlign: "center" }}>
          Información Ingreso y Antigüedad
        </h4>
        <div className="col-xs-12 col-md-6">
          {fechaIngreso ? (
            <table className="table table-striped table-borderd table-sm">
              <thead>
                <tr>
                  <th> Fechas de Ingreso </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{fechaIngreso}</td>
                </tr>
              </tbody>
            </table>
          ) : null}
        </div>
        <div className="col-xs-12 col-md-6">
          {antiguedad ? (
            <table className="table table-striped table-bordered table-sm ">
              <thead>
                <tr>
                  <th>Antigüedad</th>
                  <th>Antigüedad Reconocida</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{antiguedad}</td>
                  <td>{antiguedadReco}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div
              style={{
                borderWidth: "1px",
                borderStyle: "double",
                padding: "2px",
              }}
            >
              <h4 style={{ textAlign: "center", padding: "5px" }}>
                No Tiene Reconocimiento de Antigüedad
              </h4>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-xs-12 col-md-6">
          {diasVac ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Dias De Vacaciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{diasVac}</td>
                </tr>
              </tbody>
            </table>
          ) : null}
        </div>
      </div>

      <div className="row">
        {!mostrar ? (
          <div
            className="row"
            style={{ display: "flex", alignContent: "space-between" }}
          >
            <div className="col-xs-12 col-md-5">
              <div className="card" style={{ width: "100%" }}>
                <div className="card-header">
                  <h4 className="p-2">Dias según antigüedad</h4>
                </div>
                <div className="card-body">
                  <ul>
                    <li>los días de licencia son corridos</li>
                    <li>20 días, antigüedad menor 5 años</li>
                    <li>25 días, antigüedad mayor a 5 y menor a 10 años</li>
                    <li>30 días, antigüedad mayor a 10 y menor a 15 años</li>
                    <li>35 días, antigüedad mayor a 15 y menor a 20 años</li>
                    <li>40 días, antigüedad mayor a 20 años</li>
                    <li>
                      En los dos últimos casos la licencia puede ser
                      particionada
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-md-7">
              <div
                className="card"
                style={{ width: "80%", marginLeft: "10px" }}
              >
                <div className="card-header">
                  <h3 className="p-2">Ingrese Datos Formulario Vacaciones</h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <label htmlFor="dias">
                      Ingrese Nombre a quien Informa Licencia
                    </label>
                    <input
                      id="namejefe"
                      name="namejefe"
                      type="text"
                      placeholder="SARMIENTO, Domingo Faustino "
                      className="form-control mr-sm-2"
                      onChange={onHandleChangename}
                      {...register("namejefe")}
                    />
                    <p>{errors.dias?.message}</p>
                  </div>

                  <div className="form-group">
                    <div></div>
                    <label htmlFor="etiqueta" style={{ marginRight: "5px" }}>
                      Fecha Inicio{" "}
                    </label>
                    <input
                      id="fechaI"
                      type="date"
                      value={fechaI}
                      onChange={onHandleChangeFechaI}
                    />
                  </div>
                  <br />

                  <div className="form-group">
                    <label htmlFor="fechaF">Fecha Fin Licencia</label>
                    <input
                      id="fechaF"
                      name="fechaF"
                      type="text"
                      placeholder=""
                      className="form-control mr-sm-2"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="fechaR">Fecha Regreso</label>
                    <input
                      id="fechaR"
                      name="fechaR"
                      type="text"
                      placeholder=""
                      className="form-control mr-sm-2"
                    />
                  </div>

                  <div className="d-grid m-4">
                    <button type="submit" className="btn btn-primary">
                      Aceptar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : mostrar ? (
          <div>
            <div>
              <button className="btn btn-info" onClick={onHandleCerrarPdf}>
                Cerrar Pdf
              </button>
            </div>
            <PDFViewer style={{ width: "80%", height: "80vh" }}>
              <DocumentLCPdf datos={valores} />
            </PDFViewer>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FormVacaciones;
