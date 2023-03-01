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
    const cpf = Number(req.body.cpf)
    const { name, email, password } = req.body

    if (!cpf || !name || !email || !password) {
      return res.status(400).send('Preencha todos os campos!')
    }

    if (typeof cpf != 'number') {
      return res.status(400).send('CPF deve ser um número!')
    }

    try {
      await clientModel.create_client(cpf, name, email, password)
      return res.redirect('/')

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
      await clientModel.update_client_by_CPF(cpf, name, email, password)

      req.session.clientId = false
      req.session.clientCpf = false

      res.redirect('/')
      return

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

      res.redirect('/')
      return

    } catch (err) {
      if (err.code == 'P2003') {
        return res.send('Não é possível deletar usuários com Pedidos')
      }

      return res.status(404).send('Usuário não encontrado')
    }
  }
  /**
   * @param {function} req realiza a requisião dos dados do usuario pra efetuar o login
   * @param {funciton} res responde com um json os resultados
   * @returns retorna a verificação de login do usuario, se existir no banco, ele loga.
   */
  async authenticate(req, res) {
    let { cpf, password } = req.body
    cpf = Number(cpf)

    if (!password || !cpf) {
      return res.status(400).send('Preencha todos os campos!')
    }

    if (typeof cpf !== 'number') {
      return res.status(400).send('CPF deve ser valor numérico')
    }

    if (typeof password !== 'string') {
      return res.status(400).send("Senha deve ser string")
    }

    const auth = await clientModel.find_by_cpf_and_password(password, cpf)

    if (auth === null) {
      return res.status(401).send('Credenciais incorretas')
    }

    req.session.clientId = auth.id_client
    req.session.clientCpf = cpf
    req.session.comissionaireId = false

    res.redirect('/')
    return
  }

  async logout(req, res) {
    if (req.session.clientId) {
      req.session.clientId = false
      req.session.clientCpf = false
    }

    res.redirect('/')
    return
  }

  // -----------Rotas front-------------

  // Página de login
  login(req, res) {
    return res.render('login')
  }

  // Página de cadastro
  register(req, res) {
    return res.render('registro')
  }

  // Dashboard
  dashboard(req, res) {
    if (!req.session.clientId) {
      res.status(401).send('Usuário não logado')
      return

    }

    return res.render('clientDashboard')
  }

  // Realizar pedido
  fazerPedido(req, res) {
    if (req.session.clientId) {
      return res.render('fazerPedido')
    }

    res.redirect('/')
    return
  }

  // Edição
  async editPage(req, res) {
    if (!req.session.clientCpf) {
      res.send('Voce nao está logado')
      return
    }

    const cpf = req.session.clientCpf
    const user = await clientModel.find_client_by_CPF(cpf)

    if (user == null) {
      res.send('Usuário não encontrado')
    }

    res.render('clientEdit', { user: user })
    return
  }
}
module.exports = new clientController()