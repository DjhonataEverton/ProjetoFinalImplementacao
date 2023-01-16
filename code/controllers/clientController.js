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
    const CPF = req.body.cpf
    const NAME = req.body.name
    const EMAIL = req.body.email
    const PASSWORD = req.body.password

    if (!CPF || !NAME || !EMAIL || !PASSWORD) {
      return res.status(400).send('Preencha todos os campos!')
    }

    try {
      const result = await clientModel.create_client(CPF, NAME, EMAIL, PASSWORD)
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

    const CPF = parseInt(req.params.cpf)

    if (CPF != req.session.clientCpf) {
      return res.send('Não é possível listar a conta de outro usuário')
    }

    const result = await clientModel.find_client_by_CPF(CPF)
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

    const CPF = parseInt(req.params.cpf)
    const NAME = req.body.name
    const EMAIL = req.body.email
    const PASSWORD = req.body.password

    if (CPF != req.session.clientCpf) {
      return res.send('Não é possivel atualizar a conta de outro usuário')
    }

    if (!CPF || !NAME || !EMAIL || !PASSWORD) {
      return res.status(400).send('Preencha todos os campos!')
    }

    try {
      const result = await clientModel.update_client_by_CPF(CPF, NAME, EMAIL, PASSWORD)

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

    const CPF = parseInt(req.params.cpf)

    if (CPF != req.session.clientCpf) {
      return res.send('Não é possivel deletar a conta de outro usuário')
    }

    try {
      await clientModel.delete_client_by_CPF(CPF)

      req.session.clientCpf = false
      req.session.clientId = false

      return res.send(`Cliente de CPF '${CPF}' deletado.`)

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
    const CPF = req.body.cpf;
    const EMAIL = req.body.email;
    const PASSWORD = req.body.password;

    if (!EMAIL || !PASSWORD || !CPF) {
      return res.status(400).send('Preencha todos os campos!')
    }

    if (typeof CPF === 'string') {
      return res.status(400).send('CPF deve ser valor numérico')
    }

    const AUTH = await clientModel.find_by_email_and_password(EMAIL, PASSWORD, CPF)

    if (AUTH === null) {
      return res.status(401).send('Credenciais incorretas')
    }

    req.session.clientId = AUTH.id_client
    req.session.clientCpf = CPF
    req.session.comissionaireId = false

    return res.send('Usuario logado com sucesso')
  }

}

module.exports = new clientController()