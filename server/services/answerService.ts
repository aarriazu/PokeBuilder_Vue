import * as AnswerModel from '../models/answerModel.js';

export async function addAnswer(answer: any) {
  return AnswerModel.insertAnswer(answer);
}

export async function getNestedAnswers(postId?: string) {
  const flatAnswers = await AnswerModel.getAnswersByPost(postId);

  const answerMap = new Map<string, any>();
  flatAnswers.forEach(ans => {
    ans.replies = [];
    answerMap.set(ans._id.toString(), ans);
  });

  const nestedAnswers: any[] = [];
  flatAnswers.forEach(ans => {
    if (ans.parentAnswerId) {
      const parent = answerMap.get(ans.parentAnswerId.toString());
      if (parent) parent.replies.push(ans);
    } else {
      nestedAnswers.push(ans);
    }
  });

  return nestedAnswers;
}

export async function editAnswer(id: string, content: string, editedAt: string, username: string) {
  const answer = await AnswerModel.findAnswerById(id);
  if (!answer) throw new Error("Respuesta no encontrada");
  if (answer.author !== username) throw new Error("No autorizado para editar esta respuesta");

  return AnswerModel.updateAnswer(id, content, editedAt);
}

export async function removeAnswer(id: string, username: string) {
  const answer = await AnswerModel.findAnswerById(id);
  if (!answer) throw new Error("Respuesta no encontrada");
  if (answer.author !== username) throw new Error("No autorizado para eliminar esta respuesta");

  return AnswerModel.deleteAnswer(id);
}
