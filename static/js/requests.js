fetch('/api/get_display_messages')
    .then(function(response) {
        return response.json();
    }).then(function(messages) {
        span_html = ""
        for (var i = 0; i < messages.length; i++) {
            span_html += `<p class="text-muted">` + messages[i] + `</p>`
        }
        document.getElementById('display-message').innerHTML = span_html
    })

fetch('/api/get_experiences')
    .then(function(response) {
        return response.json();
    }).then(function(experiences) {
        html = ""
        for (var i = 0; i < experiences.length; i++) {
            html += `<a href="/experience/` + experiences[i]._id + `"><div class="timeline-item mt-4" style="cursor: pointer;">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="duration date-label-left border rounded p-2 pl-4 pr-4 position-relative shadow text-left" style="color: black;">` + experiences[i]._duration + `</div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="event event-description-right rounded p-4 border float-left text-left">
                                    <h5 class="title mb-0 text-capitalize" style="color: black;">` + experiences[i]._company + ` | ` + experiences[i]._role + `</h5>
                                    <small class="text-primary">Mentor: ` + experiences[i]._mentor + `</small>
                                </div>
                            </div>
                        </div>
                    </div></a>`
        }
        document.getElementById('experiences-container').innerHTML = html
    })

fetch('/api/get_educationDetails')
    .then(function(response) {
        return response.json()
    }).then(function(educations) {
        html = ""
        for (var i = 0; i < educations.length; i++) {
            html += `<div class="timeline-item mt-4">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="duration date-label-left border rounded p-2 pl-4 pr-4 position-relative shadow text-left" style="background-color: white;">` + educations[i]._start + ` - ` + educations[i]._end + `</div>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <div class="event event-description-right rounded p-4 border float-left text-left" style="background-color: white;">
                                    <h5 class="title mb-0 text-capitalize">` + educations[i]._college + `</h5>
                                    <small class="text-primary">` + educations[i]._title + ` | ` + educations[i]._branch + ' | ' + educations[i]._score + `</small>
                                </div>
                            </div>
                        </div>
                    </div>`
        }
        document.getElementById('education-container').innerHTML = html
    })

fetch('/api/get_mainProjects')
    .then(function(response) {
        return response.json()
    }).then(function(projects) {
        html = `
    <div class="portfolioContainer row">`
        for (var i = 0; i < projects.length; i++) {
            if (projects[i]._weblink == "") {
                html += `<div class="col-lg-4 col-md-6 mt-4 pt-2 ` + projects[i]._tags + `" data-aos="fade-up">
                            <div class="portfolio-box rounded shadow position-relative overflow-hidden">
                                <div class="portfolio-box-img position-relative overflow-hidden">
                                    <img src="data:image/gif;base64,` + projects[i]._image + `" class="img-fluid" alt="member-image">
                                    <div class="overlay-work">
                                        <div class="work-content text-center">
                                            <a href="` + projects[i]._github + `" class="text-light work-icon bg-dark d-inline-block rounded-pill"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github fea icon-sm image-icon"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="gallary-title py-4 text-center">
                                    <h5><a href="` + projects[i]._github + `" class="title text-dark">` + projects[i]._title + `</a></h5>
                                    <span style="font-size: small; color: lightcoral;">` + projects[i]._description + `</span>
                                </div>
                            </div>
                        </div>`
            } else {
                html += `<div class="col-lg-4 col-md-6 mt-4 pt-2 ` + projects[i]._tags + `" data-aos="fade-up">
                            <div class="portfolio-box rounded shadow position-relative overflow-hidden">
                                <div class="portfolio-box-img position-relative overflow-hidden">
                                    <img src="data:image/gif;base64,` + projects[i]._image + `" class="img-fluid" alt="member-image">
                                    <div class="overlay-work">
                                        <div class="work-content text-center">
                                            <a href="` + projects[i]._github + `" class="text-light work-icon bg-dark d-inline-block rounded-pill"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github fea icon-sm image-icon"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
                                            <a href="` + projects[i]._weblink + `" class="text-light work-icon bg-dark d-inline-block rounded-pill"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-link fea icon-sm image-icon"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></a>
                                        </div>
                                    </div>
                                </div>
                                <div class="gallary-title py-4 text-center">
                                    <h5><a href="` + projects[i]._github + `" class="title text-dark">` + projects[i]._title + `</a></h5>
                                    <span style="font-size: small; color: lightcoral;">` + projects[i]._description + `</span>
                                </div>
                            </div>
                        </div>`
            }
        }
        html += `</div>
        <div class="row">
        <div class="col-lg-12 mt-4 pt-2">
            <div class="text-center">
                <a href="/projects" class="btn btn-outline-primary">More works <i data-feather="refresh-cw" class="fea icon-sm"></i></a>
            </div>
        </div>
    </div>`
        document.getElementById('portfolio-container').innerHTML += html
    })

function inputChanged(id) {
    document.getElementById(id).innerHTML = ""
}

function sendmessage_toAdmin() {
    var name = document.getElementById('name').value
    var email = document.getElementById('email').value
    var subject = document.getElementById('subject').value
    var comments = document.getElementById('comments').value

    const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name == "") {
        document.getElementById('form_name_val').innerHTML = "Name Invalid"
    } else if (mailformat.test(String(email).toLowerCase()) == false) {
        document.getElementById('form_email_val').innerHTML = "Email Invalid"
    } else if (subject == "") {
        document.getElementById('form_subject_val').innerHTML = "Subject Invalid"
    } else if (comments == "") {
        document.getElementById('form_comment_val').innerHTML = "Comments Invalid"
    } else {
        var params = { '_name': name, '_email': email, '_subject': subject, '_comment': comments }

        $.ajax({
            type: 'POST',
            url: '/api/messsage_recieved',
            data: params
        })

        alert("Your Message is Recorded !!!")
    }
}