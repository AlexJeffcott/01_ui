import React from 'react'
import App from './App'

const Api = ({ actions }) => {
    const {getDeps, getMock} = actions
    const {httpClient, shuffle} = getDeps()

    const _actions = {
        ...actions,
        getQs: (num=10) => httpClient ? httpClient(`api/questions?${num}`) : getMock("questions").slice(0, num),
        getQById: id => httpClient ? httpClient(`api/questions/${id}`) : getMock("questions").find(i => i.id === id),
        getAnswers: id => httpClient ? httpClient(`api/answers/${id}`) : shuffle(getMock("questions").filter(i => i.id && i.id !== id)).slice(0, 3),
        getImgById: id => httpClient ? httpClient(`api/imgs/${id}`) : getMock("imgs")[id],
        getAudioById: id => httpClient ? httpClient(`api/audio/${id}`) : getMock("audio")[id],
    }

    return <App actions={_actions} />
}

export default Api