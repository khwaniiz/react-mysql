import { useState } from 'react'
import Axios from 'axios'
import { Typography, TextField, Grid, Container, Button, Card, CardContent, Box, IconButton } from '@material-ui/core'
import useStyles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';

function App() {
  const classes = useStyles()

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = (e) => {
    e.preventDefault()
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then((res) => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage
        }
      ])
      setName("")
      setAge(0)
      setCountry("")
      setPosition("")
      setWage(0)
    }).catch((err) => {
      console.log(err)
    })
  }

  const getEmployees = () => {
    Axios.get('http://localhost:3001/employees')
      .then((res) => {
        console.log(res.data)
        setEmployeeList(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const updateEmployeeWage = (employeeId) => {
    Axios.put("http://localhost:3001/update", {
      wage: newWage,
      id: employeeId
    }).then((res) => {
      alert("Updated!")
      setEmployeeList(employeeList.map((val) => {
        return val.id === employeeId ? {
          id: val.id,
          name: val.name,
          country: val.country,
          age: val.age,
          position: val.position,
          wage: newWage,
        }
          : val
      })
      )
    }).catch((err) => {
      console.log(err)
    })
  }

  const deleteEmployee = (employeeId) => {
    Axios.delete(`http://localhost:3001/delete/${employeeId}`)
      .then((res) => {
        setEmployeeList(employeeList.filter((val) => {
          return val.id !== employeeId
        }))
      })
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} >
        <Container component="main" maxWidth="xs" className={classes.container}>
          <Typography component="h1" variant="h5" style={{ "marginBottom": "2rem" }}>
            Employee Information
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  value={name}
                  variant="outlined"

                  fullWidth
                  autoFocus
                  onChange={(e) => { setName(e.target.value) }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="age"
                  name="age"
                  label="Age"
                  type="number"
                  value={age}
                  variant="outlined"
                  required
                  fullWidth
                  autoFocus
                  InputProps={{ inputProps: { min: 18 } }}
                  onChange={(e) => { setAge(e.target.value) }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="country"
                  name="country"
                  label="Country"
                  value={country}
                  variant="outlined"
                  required
                  fullWidth
                  autoFocus
                  onChange={(e) => { setCountry(e.target.value) }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="position"
                  name="position"
                  label="Position"
                  value={position}
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) => { setPosition(e.target.value) }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="wage"
                  name="wage"
                  label="Wage (year)"
                  value={wage}
                  variant="outlined"
                  required
                  fullWidth
                  autoFocus
                  type="number"
                  InputProps={{ inputProps: { min: 0, } }}
                  onChange={(event) => { setWage(event.target.value) }}
                />
              </Grid>
            </Grid>

            <Button
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submit}
              onClick={addEmployee}
            >
              Add Employee
            </Button>
          </form>
        </Container>
      </Grid>
      <Grid item xs={12} sm={6} >
        <Container component="main" maxWidth="xs" className={classes.container}>
          <Button
            fullWidth
            variant="outlined"
            className={classes.submit}
            onClick={getEmployees}
          >
            Show Employees
          </Button>

          {employeeList.map((val, key) => {
            return (
              <Box mb={4} key={key}>
                <Card variant="outlined">
                  <CardContent>
                    <IconButton aria-label="delete" onClick={() => deleteEmployee(val.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <Typography color="textSecondary" className={classes.employeesBox}>
                      Name: {val.name}
                    </Typography>
                    <Typography color="textSecondary" className={classes.employeesBox}>
                      Age: {val.age}
                    </Typography>
                    <Typography color="textSecondary" className={classes.employeesBox}>
                      Country: {val.country}
                    </Typography>
                    <Typography color="textSecondary" className={classes.employeesBox}>
                      Position: {val.position}
                    </Typography>
                    <Typography color="textSecondary" className={classes.employeesBox}>
                      Wage: {val.wage}
                    </Typography>

                    <TextField
                      label="Wage (year)"
                      variant="outlined"
                      required
                      fullWidth
                      type="number"
                      InputProps={{ inputProps: { min: 0, } }}
                      onChange={(event) => { setNewWage(event.target.value) }}
                    />
                    <Box mt={2}>
                      <Button onClick={() => updateEmployeeWage(val.id)} >Update</Button>
                    </Box>

                  </CardContent>
                </Card>
              </Box>
            )
          })}
        </Container>
      </Grid>
    </Grid>
  );
}

export default App;
