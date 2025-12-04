import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router';

function HomePage() {
  return (
    <Container fluid className="home-page">
      {/* Hero Section */}
      <Row className="hero-section text-center py-5 mb-4 bg-primary text-white">
        <Col>
          <h1 className="display-4 fw-bold mb-3">ProjectPilot</h1>
          <p className="lead fs-5 mb-4 px-3">
            Manage your projects efficiently with our comprehensive project management solution. 
            Track budgets, monitor progress, and collaborate with your team all in one place.
          </p>
          <Link to="/projects">
            <Button variant="light" size="lg" className="hero-btn px-4 py-2">
              View Projects
            </Button>
          </Link>
        </Col>
      </Row>

      {/* Features Section */}
      <Container className="py-4">
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 text-center p-3">
              <Card.Body>
                <div className="mb-3">
                  <i className="bi bi-kanban fs-1 text-primary"></i>
                </div>
                <Card.Title className="fw-bold mb-2 fs-5">Project Tracking</Card.Title>
                <Card.Text className="text-muted fs-6">
                  Keep track of all your projects in one centralized location with 
                  real-time updates and status monitoring.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 text-center p-3">
              <Card.Body>
                <div className="mb-3">
                  <i className="bi bi-cash-stack fs-1 text-success"></i>
                </div>
                <Card.Title className="fw-bold mb-2 fs-5">Budget Management</Card.Title>
                <Card.Text className="text-muted fs-6">
                  Monitor project budgets, track expenses, and ensure your projects 
                  stay within financial constraints.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="h-100 shadow-sm border-0 text-center p-3">
              <Card.Body>
                <div className="mb-3">
                  <i className="bi bi-people fs-1 text-info"></i>
                </div>
                <Card.Title className="fw-bold mb-2 fs-5">Team Collaboration</Card.Title>
                <Card.Text className="text-muted fs-6">
                  Work seamlessly with your team members, share updates, and 
                  collaborate on project deliverables.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default HomePage;