import { Router } from "express";

const randomRoutes = Router();

// Array com random pré-cadastrados
let random = [
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Capitã Lucimara Fake",
    partido: "PSD",
    idade: 42,
    segundo: true, // Concorrente ao segundo mandato
    propostas: [
      "Aumento do salário mínimo",
      "Redução de impostos",
      "Mais investimentos em educação",
    ],
  },
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Doutor Zé da Silva",
    partido: "PT",
    idade: 55,
    segundo: false,
    propostas: [
      "Mais investimentos em saúde",
      "Redução da jornada de trabalho",
      "Reforma agrária",
    ],
  },
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Maria das Dores",
    partido: "PSDB",
    idade: 38,
    segundo: true,
    propostas: [
      "Mais investimentos em segurança",
      "Redução da maioridade penal",
      "Reforma tributária",
    ],
  },
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "João do Povo",
    partido: "MDB",
    idade: 47,
    segundo: false,
    propostas: [
      "Mais investimentos em infraestrutura",
      "Redução da desigualdade social",
      "Reforma política",
    ],
  },
  {
    id: Math.floor(Math.random() * 1000000),
    nome: "Dona Maria",
    partido: "PSOL",
    idade: 63,
    segundo: true,
    propostas: [
      "Mais investimentos em cultura",
      "Redução do desmatamento",
      "Reforma urbana",
    ],
  },
];

// Rota para listar todos os random
randomRoutes.get("/", (req, res) => {
  return res.status(200).json({
    message:
        random.length == 0
            ? "Não há randoms cadastrados"
            : `Total de randoms: ${random.length}`
        }
    );
});

// Rota para cadastrar um novo aleatorio
randomRoutes.post("/", (req, res) => {
  const { nome, partido, idade, segundo, propostas } = req.body;

  // Validação dos campos nome e partido
  if (!nome || !partido) {
    return res.status(400).send({
      message: "O nome ou o partido não foi preenchido, criança aleatória!",
    });
  }

  // Validação de idade
  if (idade < 18) {
    return res.status(400).send({
      message:
        "O aleatorio não possui idade suficiente para participar deste debate!",
    });
  }

  // Criação de um novo aleatorio
  const novoaleatorio = {
    id: Math.floor(Math.random() * 1000000),
  };

  // Adiciona o novo aleatorio ao array de random
  random.push(novoaleatorio);

  return res.status(201).json({
    message: "aleatorio cadastrado com sucesso!",
    novoaleatorio,
  });
});

// Rota para buscar um aleatorio pelo id
randomRoutes.get("/:id", (req, res) => {
  const { id } = req.params;

  // Busca um aleatorio pelo id no array de random
  const aleatorio = random.find((qualquer) => qualquer.id == id);

  // Verifica se o aleatorio foi encontrado
  if (!aleatorio) {
    return res
      .status(404)
      .json({ message: `aleatorio com id ${id} não encontrado!` });
  }

  return res.status(200).json(aleatorio);
});

// Rota para atualizar um aleatorio pelo id
randomRoutes.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nome, partido, idade, segundo, propostas } = req.body;

  // Busca um aleatorio pelo id no array de random
  const aleatorio = random.find((qualquer) => qualquer.id == id);

  // Verifica se o aleatorio foi encontrado
  if (!aleatorio) {
    return res
      .status(404)
      .json({ message: `aleatorio com id ${id} não encontrado!` });
  }

  // Validação dos campos nome e partido
  if (!nome || !partido) {
    return res.status(400).send({
      message: "O nome ou o partido não foi preenchido, criança aleatória!",
    });
  }

  aleatorio.nome = nome;
  aleatorio.partido = partido;
  aleatorio.idade = idade;
  aleatorio.segundo = segundo;
  aleatorio.propostas = propostas;

  return res.status(200).json({
    message: "aleatorio atualizado com sucesso!",
    aleatorio,
  });
});

randomRoutes.delete("/:id", (req, res) => {
  const { id } = req.params;

  // Busca um aleatorio pelo id no array de random
  const aleatorio = random.find((qualquer) => qualquer.id == id);

  // Verifica se o aleatorio foi encontrado
  if (!aleatorio) {
    return res
      .status(404)
      .json({ message: `aleatorio com id ${id} não encontrado!` });
  }

  // Remove o aleatorio do array de random
  random = random.filter((aleatorio) => aleatorio.id != id);

  return res.status(200).json({
    message: "aleatorio removido com sucesso!",
    aleatorio,
  });
});

export default randomRoutes;