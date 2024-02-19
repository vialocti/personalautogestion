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

const DocumentLCPdf = ({ datos }) => {
  //console.log(datos)

  const traerMes = (mes) => {
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

  const [fechahoy, setFechahoy] = useState(null);
  const [anioLic, setAnioLic] = useState(null);

  useEffect(() => {
    const convertirfecha = (fe) => {
      let dia = fe.getDate();
      let mes = fe.getMonth() + 1;
      let anio = fe.getFullYear();
      if (dia < 10) {
        dia = "0" + dia;
      }
      /*
            if (mes<10){
              mes = '0' + mes
            }
            */
      setAnioLic(anio);
      //console.log('H',dia,mes,anio)
      return dia + " de " + traerMes(mes) + " de " + anio;
    };
    let fecha = new Date();
    if (fecha) {
      setFechahoy(convertirfecha(fecha));
      //console.log(fecha)
    }
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
      borderStyle: "dotted",
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
            LICENCIA ANUAL ORDINARIA {anioLic ? anioLic : null}
          </Text>
        </View>

        <View style={{ padding: "30px", marginTop: "20px" }}>
          <Text
            style={{
              fontSize: "11px",
              fontWeight: "bold",
              marginTop: "10px",
              marginBottom: "5px",
            }}
          >
            Sr.Decano de la Facultad de Ciencias Economicas
          </Text>
          <Text style={{ fontSize: "10px" }}>De mi consideración</Text>
        </View>

        <View style={{ padding: "10px" }}>
          <Text
            style={{
              fontSize: "10px",
              marginLeft: "45px",
              marginBottom: "5px",
            }}
          >
            Me dirijo a usted a fin de informarle que gozaré de la
          </Text>
          <Text style={{ fontSize: "10px", marginLeft: "15px" }}>
            Licencia Anual Ordinaria año {datos.anioLic} desde el {datos.fechaI}{" "}
            hasta el {datos.fechaF} inclusive
          </Text>
        </View>

        <View style={{ padding: "10px" }}>
          <Text style={{ fontSize: "10px", marginLeft: "15px" }}>
            {" "}
            -Fecha de Reintegro {datos.fechaR}
          </Text>
        </View>
        <View style={{ padding: "10px" }}>
          <Text
            style={{
              fontSize: "10px",
              marginLeft: "15px",
              marginBottom: "5px",
            }}
          >
            Asimismo, dejo constancia que el periodo de la Licencia Anual
            Ordinaria
          </Text>
          <Text style={{ fontSize: "10px", marginLeft: "15px" }}>
            ha sido informado a {datos.superior}, quíen ha prestado su
            conformidad{" "}
          </Text>

          <Text
            style={{ fontSize: "10px", marginLeft: "15px", marginTop: "20px" }}
          >
            Saludo a usted atentamente
          </Text>
        </View>

        <View style={styles.identi}>
          <View style={styles.identi1}>
            <Text style={styles.recua}>Apellido y Nombre: {datos.nombre}</Text>
            <Text style={styles.recua}>Legajo: {datos.legajo}</Text>

            <Text style={styles.recua}>
              Fecha: {fechahoy ? fechahoy : null}
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.observa}>OBSERVACIONES:</Text>
          <Text style={styles.observa}>
            Recuerde enviar el formulario a recursoshumanos@fce.uncu.edu.ar, con
            copia a su Jefe inmediato{" "}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default DocumentLCPdf;

//<Text style={{fontSize:'10px', marginTop:'10px'}}>Señor/a</Text>
//<Text style={{fontSize:'10px', textAlign:'right', marginRight:'50px', marginTop:'10px'}}>Mendoza:{fechaHoy}</Text>
