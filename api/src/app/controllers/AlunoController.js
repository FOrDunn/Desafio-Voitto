import Aluno from '../models/Aluno';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll()
    res.json(alunos);
  }

  async read(req, res) {
    try {
    const id  = req.params.id
    const aluno = await Aluno.findByPk(id);
    if(aluno == null) {
      return res.status(404).json({Error: 'O aluno com este id nao existe'});
    }
    res.status(200).json(aluno);
    } catch(err) {
      return res.status(404).json(err);
    }
  }

  async create(req, res) {
    try {
      if(await Aluno.findOne({ where: { email: `${req.body.email}` } })) {
        return res.status(403).json({Error: 'O aluno com este email ja existe'});
      }
      const alunoCriado = await Aluno.create(req.body);
      return res.status(200).json(alunoCriado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const novasInfos = req.body;
    try {
      await Aluno.update(novasInfos, {
        where: {
          id: Number(id)
        }
      });
      const alunoAtualizado = await Aluno.findOne({
        where: {
          id: Number(id)
        }
      });
      return res.status(200).json(alunoAtualizado);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  

  async delete(req, res) {
    const id = req.params.id;
    console.log(req.params.id)
    try {
      await Aluno.destroy({
        where: {
          id: Number(id)
        }
      });
      return res.status(200).json({ mensagem: `Aluno referente ao id ${id} deletado` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

}

export default new AlunoController();
