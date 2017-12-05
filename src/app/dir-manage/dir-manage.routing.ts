import { Routes, RouterModule } from '@angular/router';
import { CreateOrEditDirComponent } from 'app/dir-manage/create-or-edit-dir/create-or-edit-dir.component';
import { CreateOrEditSubdirComponent } from 'app/dir-manage/create-or-edit-subdir/create-or-edit-subdir.component';
import { DirManageComponent } from 'app/dir-manage/dir-manage.component';

const routes: Routes = [
    {
        path: '',
        component: DirManageComponent,
        children: [
            {
                path: 'create',
                component: CreateOrEditDirComponent
            },
            {
                path: 'create/dir-item/:dirItemId',
                component: CreateOrEditSubdirComponent
            },
            {
                path: 'edit/:dirId',
                component: CreateOrEditDirComponent
            },
            {
                path: 'edit/dir-item/:dirId/:dirItemId',
                component: CreateOrEditSubdirComponent
            },
        ]
    }
];

export const DirManageRoutes = RouterModule.forChild(routes);