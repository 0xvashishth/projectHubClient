export default function UserCard(props){ 
        <div className='col'>
        <div class='card mb-3'>
        <h3 class="card-header">Project: {props.id}</h3>
        <div class="card-body">
          <h5 class="card-title">{props.name}</h5>
          <h6 class="card-subtitle text-muted">Email: {props.email}</h6>
        </div>
        <img src="https://avatars.githubusercontent.com/u/76911582?s=400&u=e5b8cd698ee7fb315ac23049a56bb03ac4149f86&v=4" />
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Twitter: {props.twitter}</li>
          <li class="list-group-item">Linkedin: {props.linkedin}</li>
          <li class="list-group-item">Github: {props.github}</li>
        </ul>
        <div class="card-body">
          <a href="#like" class="card-link">Like User</a>
          <a href="#report" class="card-link">Report User</a>
        </div>
        <div class="card-footer text-muted">
          Points: {props.points}
        </div>
      </div>
      </div>
}