import { Image, Accordion} from "react-bootstrap";

function AcercaDe() {
  return (
    <>
      <div className="AcercaDe">
        <Image
          className="corregir-img"
          src="https://blog.grupo-pya.com/wp-content/uploads/2016/11/Recursos-definici%C3%B3n.jpg"
          fluid
        />
      </div>
      <div>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Acerca de nosotros</Accordion.Header>
            <Accordion.Body>
              <p>
                Somos una empresa Global de Comunicación y Posicionamiento
                Estratégico, la mayor en España.
              </p>
              <p>
                Nuestras oficinas propias en 15 países y nuestra red de partners
                nos permiten ofrecer una cobertura global a nuestros clientes.
                Con casi 400 profesionales, de 30 nacionalidades y perfiles
                multidisciplinares, aportamos soluciones integrales en más de 20
                áreas de especialización.
              </p>
              <p>
                Desarrollamos conocimiento a través de la investigación en
                colaboración con prestigiosos centros de talento (IESE, IE y
                Deusto Business School). Publicamos estudios, informes y libros
                de las últimas tendencias en Comunicación. Organizamos
                encuentros para favorecer el acercamiento de nuestros clientes
                con los actores clave y sus públicos objetivo.
              </p>
              <p>
                Hemos sido reconocidos con importantes galardones nacionales e
                internacionales, como Sabre Awards, International Stevie Awards,
                Questar Awards, Mercury Excellence Awards, Best Place to Work,
                Premios Nacionales de Marketing, o el Iberian Consultancy of the
                Year en los EMEA Sabre Awards 2018.
              </p>
              <p>
                Creemos en el poder de la comunicación como herramienta
                transformadora. Desde nuestro compromiso de responsabilidad
                social, buscamos generar valor en nuestro entorno desarrollando
                y compartiendo conocimiento, construyendo redes de diálogo y
                colaboración o apoyando iniciativas que marcan la diferencia.
                Siempre con el foco en las personas, para construir juntos un
                horizonte sostenible.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Nuestros objetivos</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
}

export default AcercaDe;
