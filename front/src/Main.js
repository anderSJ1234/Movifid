import { useState, useEffect } from "react";
import patata from "./components/img/nodisponible.png";
import {
  Card,
  Row,
  Navbar,
  InputGroup,
  Button,
  FormControl,
  Pagination,
  Image,
  Alert,
  Spinner,
} from "react-bootstrap";
function Main() {
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cambioPagina, setCambioPagina] = useState(1);
  const [boton, setBoton] = useState(false);
  const [mostrarPeli, setMostrarPeli] = useState("");
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/trending/all/day?api_key=16c0c7c2001417163ffa6562e476124e&page=${cambioPagina}&language=es`
  );
 /*  const [url2, setUrl2] = useState(
    `https://api.themoviedb.org/3/search/movie?api_key=16c0c7c2001417163ffa6562e476124e&query=${input.replace(
      " ",
      "+"
    )}&language=es&page=${
      cambioPagina === 0 ? (setCambioPagina(1), cambioPagina) : cambioPagina
    }`
  ); */
  const [input, setInput] = useState("");


  useEffect(() => {
    setLoading(true)
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData2(res.results);
        setLoading(false)
        console.log(res.results);
      });
  }, [url]);

  function PeliculaTarjeta() {
    let title = "";
    if (mostrarPeli.title !== undefined) {
      title = mostrarPeli.title;
    } else if (mostrarPeli.name !== undefined) {
      title = mostrarPeli.name;
    } else if (mostrarPeli.original_title !== undefined) {
      title = mostrarPeli.original_title;
    } else if (mostrarPeli.original_name !== undefined) {
      title = mostrarPeli.original_name;
    }
    let title2 = "";
    if (mostrarPeli.release_date !== undefined) {
      title2 = mostrarPeli.release_date;
    } else if (mostrarPeli.first_air_date !== undefined) {
      title2 = mostrarPeli.first_air_date;
    }
    return (
      <div className="centrarLaimg">
        <Image
          className="img-centro"
          src={
            mostrarPeli.poster_path === null
              ? patata
              : `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${mostrarPeli.poster_path}`
          }
          thumbnail
        />
        <Alert variant="dark">
          <div className="posicion-texto">
            <Button variant="outline-primary">{title}</Button>{" "}
          </div>
          <div className="posicion-texto">Fecha de estreno: {title2}</div>
          <div className="posicion-texto">{mostrarPeli.overview}</div>
        </Alert>
      </div>
    );
  }

  
  let todasLasPelis = data2.map((pelicula, index) => {
    let title = "";
    if (pelicula.title !== undefined) {
      title = pelicula.title;
    } else if (pelicula.name !== undefined) {
      title = pelicula.name;
    } else if (pelicula.original_title !== undefined) {
      title = pelicula.original_title;
    } else if (pelicula.original_name !== undefined) {
      title = pelicula.original_name;
    }

    let title2 = "";
    if (pelicula.release_date !== undefined) {
      if(pelicula.release_date ===""){
        title2 = "xxxx-xx-xx"
      }else{
        title2 = pelicula.release_date;
      }
    } else if (pelicula.first_air_date !== undefined) {
      if(pelicula.first_air_date ===""){
        title2 = "xxxx-xx-xx"
      }else{
        title2 = pelicula.first_air_date;
      } 
    }
    return (
      <Row className="row">
        <Card style={{ width: "15rem" }} key={index} className="cards">
          <Card.Img
            variant="top"
            src={
              pelicula.poster_path === null
                ? patata
                : `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${pelicula.poster_path}`
            }
            className="alargar-img"
          />
          <Card.Body className="centrar-todo">
            <Card.Title className="centrar-todo">{title}</Card.Title>
            <Navbar.Text>Fecha de estreno: {title2}</Navbar.Text>
            <Button variant="primary" onClick={() => infoPeli(pelicula.id)}>
              información completa
            </Button>
          </Card.Body>
        </Card>
      </Row>
    );
  });

  function infoPeli(id) {
    console.log("llamando algo");
    console.log(
      `https://api.themoviedb.org/3/movie/${id}?api_key=16c0c7c2001417163ffa6562e476124e`
    );
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=16c0c7c2001417163ffa6562e476124e`
    )
      .then((res) => res.json())
      .then((res) => {
        setMostrarPeli(res);
        console.log(res);
        setBoton(true);
      });
  }

  function noPasarPagina() {
    if (cambioPagina < 1) {
      setCambioPagina(cambioPagina=== 0 ? (setCambioPagina(1), cambioPagina+ 1): cambioPagina -1);
    } else {
      setCambioPagina( cambioPagina-1)
      setUrl(
        pageUrl(cambioPagina-1)
      )
    }
  }

  function noPasarPagina10() {
    if (cambioPagina < 1) {
      setCambioPagina(1);
      setUrl()
    } else {
      if (cambioPagina - 10 >= 1) {
        setCambioPagina(cambioPagina - 10);
      } else {
        setCambioPagina(1);
      }
       setCambioPagina(cambioPagina - 10)
      setUrl(
        pageUrl(cambioPagina - 10)
      )
    }
  }
  function PasarPagina() {
    if (cambioPagina < 1) {
      setCambioPagina(1);
    } else {
      setCambioPagina(cambioPagina + 1)
      setUrl(
        pageUrl(cambioPagina+ 1)
      )
    }
  }

  function PasarPagina10() {
    if (cambioPagina < 1) {
      setCambioPagina(1);
    } else {
      setCambioPagina(cambioPagina + 10); let newUrl=url +`&page=${cambioPagina +10}`
      pageUrl(cambioPagina +10)
      setUrl(
        newUrl
      );
    }
  }


  function pageUrl(page){
    let newUrl
    if(url.search("&page=") === -1){
      newUrl = url + `&page=${page}`
    }else{
      let indice = url.search("&page=");
      console.log(indice)
      let parte1 = url.slice(0, indice)
      let parte2 = url.slice(indice + 7)
      console.log(parte1)
      console.log(parte2)
      newUrl = parte1 + `&page=${page}` +  parte2
      console.log(newUrl)
    }
    return(newUrl)
  }


  if (loading) {
    return(
    <div className="spinnner">
      <div>Cargando...</div>
      <Spinner animation="border" variant="success" />
    </div>
    )
  }else{
    if (boton) {
      return (
        <div className="padding">
          <div className="row2">
            <PeliculaTarjeta />
          </div>
  
           <Pagination className="pagination">
            <Pagination.First onClick={noPasarPagina10} />
            <Pagination.Prev onClick={noPasarPagina} />
  
            <Pagination.Item active>
              {cambioPagina === 0 ? cambioPagina +1: cambioPagina}
            </Pagination.Item>
  
            <Pagination.Next onClick={PasarPagina} />
            <Pagination.Last onClick={PasarPagina10} />
          </Pagination>
        </div>
      );
    } else {
      return (
        <div className="padding">
          <InputGroup size="sm" className="mb-3">
            <FormControl
              aria-describedby="basic-addon1"
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input.toLowerCase()}
              placeholder="Buscar pelicula"
            />
            <Button
              variant="outline-secondary"
              onClick={() => {
                setCambioPagina(1)
                input === ""
                  ? (todasLasPelis = [])
                  : setUrl(
                      `https://api.themoviedb.org/3/search/movie?api_key=16c0c7c2001417163ffa6562e476124e&query=${input.replace(
                        " ",
                        "+"
                      )}&language=es`
                    );
              }}
            >
              Buscar
            </Button>
          </InputGroup>
          <div className="popular">
            <h1>Peliculas y series populares</h1>
          </div>
          <div className="row2">
            {todasLasPelis.length === 0 ? (
              <font face="Comic Sans MS,Arial,Verdana">
                No se encontraron resultados para esta busqueda
              </font>
            ) : (
              todasLasPelis
            )}
          </div>
          <Pagination className="pagination">
            <Pagination.First onClick={noPasarPagina10} />
            <Pagination.Prev onClick={noPasarPagina} />
  
            <Pagination.Item active>
              {cambioPagina === 0 ? cambioPagina + 1 : cambioPagina}
            </Pagination.Item>
  
            <Pagination.Next onClick={PasarPagina} />
            <Pagination.Last onClick={PasarPagina10} />
          </Pagination>
        </div>
      );
    }
  }
 
}

export default Main;
