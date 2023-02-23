const clientModel = require("../models/clientModel")

/**
 * @class classe responsável por guardar os metodos de tratamento das requisições e respostas dos clientes
 */
class clientController {

  /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @returns retorna o json com os dados vindos do banco de dados
   */

  async listClients(req, res) {
    if (!req.session.comissionaireId) {
      return res.status(401).send('Página Restrita.')
    }

    const result = await clientModel.list_clients()
    return res.json(result)
  }

  /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @returns retorna o status 201 e mostra os dados inseridos no banco de dados
   */

  async createClient(req, res) {
    const { cpf, name, email, password } = req.body

    if (!cpf || !name || !email || !password) {
      return res.status(400).send('Preencha todos os campos!')
    }

    if (typeof cpf != 'number') {
      return res.status(400).send('CPF deve ser um número!')
    }

    try {
      const result = await clientModel.create_client(cpf, name, email, password)
      return res.status(201).json(result)

    } catch (err) {
      if (err.meta.target == 'tb_client_email_key') {
        return res.status(400).send('Email já cadastrado')
      } else {
        return res.status(400).send('CPF já cadastrado')
      }
    }
  }

  /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @returns retorna os dados do res.json
   */

  async findByCPF(req, res) {
    if (!req.session.clientCpf) {
      return res.status(401).send('Você não está logado!')
    }

    const cpf = parseInt(req.params.cpf)

    if (cpf != req.session.clientCpf) {
      return res.send('Não é possível listar a conta de outro usuário')
    }

    const result = await clientModel.find_client_by_CPF(cpf)
    if (result === null) {
      return res.status(404).send('Usuário não encontrado')
    }

    return res.json(result)
  }

  /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @returns retorna se foi possível atualizar os dados, se sim atualiza, se não retorna que não foi possível
   */
  async updateByCpf(req, res) {

    if (!req.session.clientCpf) {
      return res.status(401).send('Você não está logado!')
    }

    const cpf = parseInt(req.params.cpf)
    const { name, email, password } = req.body

    if (cpf != req.session.clientCpf) {
      return res.send('Não é possivel atualizar a conta de outro usuário')
    }

    if (!cpf || !name || !email || !password) {
      return res.status(400).send('Preencha todos os campos!')
    }

    try {
      const result = await clientModel.update_client_by_CPF(cpf, name, email, password)

      req.session.clientId = false
      req.session.clientCpf = false

      return res.json(result)

    } catch (err) {
      if (err.meta.target == 'tb_client_email_key') {
        return res.status(400).send('Email já cadastrado')

      } else {
        return res.status(404).send('Cliente não encontrado')
      }
    }
  }

  /**
   * 
   * @param {function} req realiza a requisição da sessão de login do usuario
   * @param {funciton} res responde com um json os resultados
   * @returns retorna o usuario do bando que possua o mesmo cpf que o inserido
   */

  async deleteByCpf(req, res) {
    if (!req.session.clientCpf) {
      return res.status(401).send('Você não está logado!')
    }

    const cpf = parseInt(req.params.cpf)

    if (cpf != req.session.clientCpf) {
      return res.send('Não é possivel deletar a conta de outro usuário')
    }

    try {
      await clientModel.delete_client_by_CPF(cpf)

      req.session.clientCpf = false
      req.session.clientId = false

      return res.send(`Cliente de CPF '${cpf}' deletado.`)

    } catch (err) {
      return res.status(404).send('Usuário não encontrado')
    }
  }
  /**
   * @param {function} req realiza a requisião dos dados do usuario pra efetuar o login
   * @param {funciton} res responde com um json os resultados
   * @returns retorna a verificação de login do usuario, se existir no banco, ele loga.
   */
  async authenticate(req, res) {
    const { cpf, email, password } = req.body
 
    if (!email || !password || !cpf) {
      return res.status(400).send('Preencha todos os campos!')
    }

    if (typeof cpf === 'string') {
      return res.status(400).send('CPF deve ser valor numérico')
    }

    if(typeof password !== 'string'){
      return res.status(400).send("Senha deve ser string")
    }

    const auth = await clientModel.find_by_email_and_password(email, password, cpf)

    if (auth === null) {
      return res.status(401).send('Credenciais incorretas')
    }

    req.session.clientId = auth.id_client
    req.session.clientCpf = cpf
    req.session.comissionaireId = false

    return res.send('Usuario logado com sucesso')
  }

}

module.exports = new clientController()