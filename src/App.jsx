import { useMemo } from "react";

const STORAGE_KEY = "cliente-onboard";

const noDataText =
  "Nenhum cadastro encontrado. Finalize primeiro o onboard para visualizar as telas liberadas.";

function parseData() {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    return serialized ? JSON.parse(serialized) : null;
  } catch {
    return null;
  }
}

function App() {
  const customer = useMemo(() => parseData(), []);

  if (!customer) {
    return (
      <main className="acesso-page">
        <header className="project-header">
          <p className="project-pill">Projeto Microfrontends</p>
        </header>
        <section className="card">
          <h2>Sistema de acesso</h2>
          <p>{noDataText}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="acesso-page">
      <header className="project-header">
        <p className="project-pill">Projeto Microfrontends</p>
      </header>

      <section className="card">
        <h2>Telas liberadas</h2>
        <p className="sub">
          Cliente: <strong>{customer.nome}</strong> | Empresa:{" "}
          <strong>{customer.empresa}</strong> | Plano:{" "}
          <strong>{customer.plano}</strong>
        </p>

        <section className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Tela</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(customer.telasLiberadas ?? []).map((screen) => (
                <tr key={screen}>
                  <td>{screen}</td>
                  <td>
                    <span className="badge">Acesso liberado</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <p className="meta">
          Cadastro concluido em{" "}
          {new Date(customer.cadastradoEm).toLocaleString("pt-BR")}
        </p>
      </section>
    </main>
  );
}

export default App;
