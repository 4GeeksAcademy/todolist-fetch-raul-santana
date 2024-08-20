import React, { useState, useEffect } from "react";

const Home = () => {
  const [newEntry, setNewEntry] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const onChangeHandler = (e) => {
    setNewEntry(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (newEntry.trim()) {
      createUserToDoList(newEntry);
      setNewEntry("");
    }
  };
  useEffect(() => {
    getToDoList();
  }, []);
  const getToDoList = () => {
    const protocol = "https"; //declaro una constante que se llama protocol y le asigno el valor "https"//
    const baseUrl = "playground.4geeks.com/todo"; //declaro otra función llamada baseURL que contiene la URL base de la API//
    const path = "/users/RaulSantana"; //declaro la constante path que almacena la ruta que se añadirá a la URL base. En este caso es un usuario//
    const fullUrl = `${protocol}://${baseUrl}${path}`; //esta constante construye la URL juntando el protocol, la URL y la ruta//
    fetch(fullUrl) //uso la función fetch para realizar una solicitud a la URL completa//
      .then((response) => {
        if (!response.ok) {
          createUser();
        } else return response.json();
      })
      .then((data) => {
        setToDoList(data.todos);
      })
      .catch((error) => {
        console.log("No se encontró el usuario", error);
      });
  };
  const createUser = () => {
    const protocol = "https";
    const baseUrl = "playground.4geeks.com/todo";
    const path = "/users/RaulSantana";
    const fullUrl = `${protocol}://${baseUrl}${path}`;
    fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        getToDoList();
      })
      .catch((error) => {
        console.log("El usuario no ha sido creado", error);
      });
  };
  const createUserToDoList = (newEntry) => {
    const protocol = "https";
    const baseUrl = "playground.4geeks.com/todo";
    const path = "/todos/RaulSantana";
    const fullUrl = `${protocol}://${baseUrl}${path}`;
    fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: newEntry,
        is_done: false,
      }),
    })
      .then(() => {
        getToDoList();
      })
      .catch((error) => {
        console.log("No se ha encontrado la lista", error);
      });
  };
  const deleteToDo = (id) => {
    const protocol = "https";
    const baseUrl = "playground.4geeks.com/todo";
    const path = "/todos";
    const fullUrl = `${protocol}://${baseUrl}${path}/${id}`;
    fetch(fullUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        getToDoList();
      })
      .catch((error) => {
        console.log("No se puede eliminar", error);
      });
  };

  return (
    <div className="container mt-3 text-center p-2 mb-3 bg-transparent">
      <h1 className="text-center mt-3"><strong>Lista de la compra</strong></h1>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-2">
          <label htmlFor="todoInput" className="form-label"></label>
          <input
            type="text"
            className="form-control"
            id="todoInput"
            placeholder="¿Qué necesitas?"
            value={newEntry}
            onChange={onChangeHandler}
          />
        </div>
      </form>
      <ul className="list-group list-group-flush mt-2">
        {Array.isArray(toDoList) &&
          toDoList.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center mt-1">
              {item.label}
              <button className="btn btn-danger btn-sm" onClick={() => deleteToDo(item.id)}>
                Eliminar
              </button>
            </li>
          ))}
      </ul>
      <p className="mt-2"><strong>Productos en tu cesta de la compra: {toDoList.length}</strong></p>
    </div>
  );
};

export default Home;
