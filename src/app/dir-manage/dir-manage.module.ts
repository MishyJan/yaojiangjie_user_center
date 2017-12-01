import * as ngCommon from '@angular/common';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirManageComponent } from './dir-manage.component';
import { CreateOrEditDirComponent } from 'app/dir-manage/create-or-edit-dir/create-or-edit-dir.component';
import { CreateOrEditSubdirComponent } from 'app/dir-manage/create-or-edit-subdir/create-or-edit-subdir.component';
import { DirManageRoutes } from 'app/dir-manage/dir-manage.routing';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { SaveDirModelComponent } from 'app/dir-manage/create-or-edit-dir/save-dir-model/save-dir-model.component';

@NgModule({
    imports: [
        CommonModule,
        DirManageRoutes,
        FormsModule,
        ngCommon.CommonModule,
        ModalModule.forRoot(),
    ],
    declarations: [
        DirManageComponent,
        CreateOrEditDirComponent,
        CreateOrEditSubdirComponent,
        SaveDirModelComponent
    ]
})
export class DirManageModule { }