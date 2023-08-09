const settings = {
    domain: "https://www.sicssalab.net/contenido-rh/json/",
    //domainApi: "http://192.168.1.87:1337",
    domainApi: "https://cms-rh.sicssa-lab.com",
    api: {
        stories: "entretenimiento/mocksStory.json",
        entertainments: "1-entretenimiento/mockEntretenimiento.json?v=2",
        statesList: "2-capacitaciones/mocksTypeService.json", //calles - tipos (curso, capacitacion)
        trainingList: "2-capacitaciones/mocksServices.json?v=2", // servicios de menu capacitaciones
        avenueProfileList: "mockAvenidasPerfiles.json",
        experiences: "3-beneficios/mockBeneficios.json?v=1",
        experiencesStates: "experiencias/mocksEstadosExperiencias.json",
        
        magicTowns: "4-premiun/mockPremiun.json?v=2",
        entertainmentProfileList: "1-entretenimiento/mockEntretenimientoPerfiles.json",
        experienceProfileList: "experiencias/mocksExperienciasPerfiles.json",
        magicTownProfileList: "pueblos-magicos/mocksPueblosMagicosPerfiles.json",
        mallsStates: "5-directorio/mockDirectorio.json",
        mallProfileList: "malls/mocks-perfiles.json",
    }
}

export default settings;