import React, { useEffect, useState } from "react";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import logo from "../assets/logo-economicas.png";

const DocumentPdf = ({ datos }) => {
  //console.log(datos);

  const traerMes = (mes) => {
    //console.log(mes);
    if (mes === 1) {
      return "Enero";
    } else if (mes === 2) {
      return "Febrero";
    } else if (mes === 3) {
      return "Marzo";
    } else if (mes === 4) {
      return "Abril";
    } else if (mes === 5) {
      return "Mayo";
    } else if (mes === 6) {
      return "Junio";
    } else if (mes === 7) {
      return "Julio";
    } else if (mes === 8) {
      return "Agosto";
    } else if (mes === 9) {
      return "Septiembre";
    } else if (mes === 10) {
      return "Octubre";
    } else if (mes === 11) {
      return "Noviembre";
    } else if (mes === 12) {
      return "Diciembre";
    }
  };

  const [fechaHoy, setFechaHoy] = useState(null);

  useEffect(() => {
    const convertirfecha = (fe) => {
      let dia = fe.getDate();
      let mes = fe.getMonth() + 1;
      let anio = fe.getFullYear();
      if (dia < 10) {
        dia = "0" + dia;
      }

      /*if (mes < 10) {
        mes = "0" + mes;
      } else {
        mes = mes.toString();
      }*/
      //console.log('H',dia,mes,anio)
      return dia + " de " + traerMes(mes) + " de " + anio;
    };
    let fecha = new Date();
    if (fecha) {
      setFechaHoy(convertirfecha(fecha));
    }
    //console.log(fecha)
  }, []);

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#E4E4E4",
    },

    section: {
      margin: 10,
      padding: 10,
      flexDirection: "row",
    },

    identi: {
      margin: 10,
      padding: 10,
      flexDirection: "row",
    },
    identi1: {
      borderRadius: "10px",
      borderStyle: "solid",
      borderWidth: "2px",
      margin: 30,
      padding: 5,
      flexDirection: "column",
    },

    image: {
      marginTop: "20px",
      width: "150px",
      height: "50px",
    },
    titulo1: {
      marginTop: "40px",
      marginLeft: "100px",
      fontSize: "12px",
    },
    titulo2: {
      marginTop: "5px",
      marginBottom: "5px",
      fontWeight: "bold",
      fontSize: "13px",
      textAlign: "center",
    },
    observa: {
      marginLeft: "30px",
      marginTop: "5px",
      marginBottom: "5px",
      fontWeight: "bold",
      fontSize: "11px",
      textAlign: "left",
    },
    opsiones: {
      marginLeft: "70px",
      marginTop: "5px",
      marginBottom: "5px",
      fontWeight: "bold",
      fontSize: "10px",
      textAlign: "left",
    },

    ops1: {
      borderStyle: "solid",
      borderWidth: "1px",
      marginLeft: "2px",
      marginTop: "5px",
      marginBottom: "5px",
      fontWeight: "bold",
      fontSize: "10px",
      textAlign: "left",
    },
    recua: {
      marginLeft: "20px",
      marginTop: "5px",
      marginBottom: "5px",
      fontWeight: "bold",
      fontSize: "10px",
      textAlign: "left",
    },

    cuadroop: {
      borderRadius: 50,
      borderStyle: "solid",
      borderWidth: "2px",
      padding: "1px",
      backgroundColor: "black",
    },
  });
  return (
    <Document useO>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image style={styles.image} src={logo} />
          <Text style={styles.titulo1}>DIRECCION DE PERSONAL</Text>
        </View>
        <View
          style={{
            borderRadius: "4px",
            borderStyle: "solid",
            marginHorizontal: "100px",
            borderWidth: "2px",
            padding: "2px",
          }}
        >
          <Text style={styles.titulo2}>
            FORMULARIO DE JUSTIFICACION DE INASISTENCIAS
          </Text>
        </View>

        <View style={{ padding: "30px", marginTop: "20px" }}>
          <Text
            style={{
              fontSize: "10px",
              textAlign: "right",
              marginRight: "50px",
              marginTop: "10px",
            }}
          >
            Mendoza:{fechaHoy}
          </Text>

          <Text
            style={{ fontSize: "11px", fontWeight: "bold", marginTop: "10px" }}
          >
            Sr.Decano de la Facultad de Ciencias Economicas
          </Text>
          <Text style={{ fontSize: "10px" }}>S / D</Text>
        </View>
        <View style={{ paddingTop: "20px", marginLeft: "30px" }}>
          <Text style={{ fontSize: "10px", marginLeft: "10px" }}>
            Tengo el agrado de dirigirme a Ud. con motivo de solicitar
            justificación de inasistencia.
          </Text>
          <Text style={{ fontSize: "10px", marginLeft: "15px" }}>
            El día {datos.dias} del corriente año no concurriré al lugar de
            trabajo debido a:
          </Text>
        </View>
        <View style={{ padding: "10px" }}>
          {datos.motivo === "1" ? (
            <Text style={styles.opsiones}>
              <Text style={styles.cuadroop}> </Text> RAZONES PARTICULARES Con
              Goce Haberes
            </Text>
          ) : datos.motivo === "10" ? (
            <Text style={styles.opsiones}>
              <Text style={styles.cuadroop}> </Text> RAZONES PARTICULARES Sin
              Goce Haberes
            </Text>
          ) : (
            <Text style={styles.opsiones}>RAZONES PARTICULARES</Text>
          )}
          {datos.motivo === "2" ? (
            <Text style={styles.opsiones}>
              <Text style={styles.cuadroop}> </Text> ARTICULO 102 Decreto 366/06
            </Text>
          ) : (
            <Text style={styles.opsiones}>ARTICULO 102 Decreto 366/06</Text>
          )}
          {datos.motivo === "3" ? (
            <Text style={styles.opsiones}>
              <Text style={styles.cuadroop}> </Text> ESTUDIO fecha:
              {datos.fechaex}, rinde:{datos.observacion}{" "}
            </Text>
          ) : (
            <Text style={styles.opsiones}>ESTUDIO</Text>
          )}

          {datos.motivo === "4" ? (
            <Text style={styles.opsiones}>
              <Text style={styles.cuadroop}> </Text> ASISTENCIA A CONGRESO
              lugar:{datos.observacion}
            </Text>
          ) : (
            <Text style={styles.opsiones}>ASISTENCIA A CONGRESO: </Text>
          )}
          {datos.motivo === "5" ? (
            <Text style={styles.opsiones}>
              <Text style={styles.cuadroop}> </Text> COMPENSACION por/el los
              dias: {datos.observacion}
            </Text>
          ) : (
            <Text style={styles.opsiones}>COMPENSACION por/el los dias:</Text>
          )}
          {datos.motivo === "6" ? (
            <Text style={styles.opsiones}>
              <Text style={styles.cuadroop}> </Text> NACIMIENTO HIJO
            </Text>
          ) : (
            <Text style={styles.opsiones}>NACIMIENTO HIJO</Text>
          )}

          {datos.motivo === "7" ? (
            <Text style={styles.opsiones}>
              <Text style={styles.cuadroop}> </Text> MATRIMONIO
            </Text>
          ) : (
            <Text style={styles.opsiones}>MATRIMONIO</Text>
          )}

          {datos.motivo === "8" ? (
            <Text style={styles.opsiones}>
              <Text style={styles.cuadroop}> </Text> FALLECIMIENTO FAMILIAR:{" "}
              {datos.observacion}
            </Text>
          ) : (
            <Text style={styles.opsiones}>FALLECIMIENTO FAMILIAR:</Text>
          )}

          {datos.motivo === "9" ? (
            <Text style={styles.opsiones}>
              <Text style={styles.cuadroop}> </Text> OTROS: {datos.observacion}
            </Text>
          ) : (
            <Text style={styles.opsiones}>OTROS</Text>
          )}

          <Text
            style={{ fontSize: "10px", marginLeft: "10px", marginTop: "20px" }}
          >
            Sin otro Particular, saludo coordialmente
          </Text>
        </View>

        <View style={styles.identi}>
          <View style={styles.identi1}>
            <Text style={styles.recua}>Apellido y Nombre: {datos.nombre}</Text>
            <Text style={styles.recua}>Legajo: {datos.legajo}</Text>
            {datos.condi === "1" ? (
              <Text style={styles.recua}>Función: Docente</Text>
            ) : (
              <Text style={styles.recua}>Función: No Docente</Text>
            )}
          </View>

          <View style={styles.identi1}>
            <Text style={styles.recua}>Visto Jefe Inmediato</Text>
            <Text style={styles.recua}>Nombre: {datos.jefe}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.observa}>OBSERVACIONES:</Text>
          <Text style={styles.observa}>
            Recuerde enviar el formulario a recursoshumanos@fce.uncu.edu.ar, con
            copia a su Jefe inmediato{" "}
          </Text>
          <Text style={styles.observa}>
            IMPORTANTE: Si corresponde adjunte constancias correspondientes
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default DocumentPdf;

//<Text style={{fontSize:'10px', marginTop:'10px'}}>Señor/a</Text>
