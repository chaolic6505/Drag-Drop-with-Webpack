import { Project } from './../model/project';
import { autobind } from '../decorators/autobind';
import { Component } from './base-component';
import { Draggable } from '../model/drag-drop';

// ProjectItem Class
export class ProjectItem
	extends Component<HTMLUListElement, HTMLLIElement>
	implements Draggable
{
	private project: Project;

	get persons() {
		if (this.project.people == 1) {
			return ' 1 person';
		}
		return `${this.project.people} people`;
	}

	constructor(hostId: string, project: Project) {
		super('single-project', hostId, false, project.id);

		this.project = project;
		this.configure();
		this.renderContent();
	}
	@autobind
	dragStartHandler(event: DragEvent) {
		event.dataTransfer!.setData('text/plain', this.project.id);
		event.dataTransfer!.effectAllowed = 'move';
	}
	dragEndHandler(_: DragEvent) {
		//console.log('Drag END');
	}

	configure() {
		this.element.addEventListener('dragstart', this.dragStartHandler);
		this.element.addEventListener('dragend', this.dragEndHandler);
	}
	renderContent() {
		this.element.querySelector('h2')!.textContent = this.project.title;
		this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
		this.element.querySelector('p')!.textContent = this.project.description;
	}
}
