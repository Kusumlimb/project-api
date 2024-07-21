<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ToDoModel; // using the todos model for database operations.

class ToDoController extends Controller
{
   
    
    public function store(Request $request){
        // dd($request->all());
        $request->validate(
            [
                'name'=>'required',
                'work'=>'required',
                'due_date'=>'required'
            ]
            );

            $todo = ToDoModel::create([
                'name' => $request->name,
                'work' => $request->work,
                'due_date' => $request->due_date
            ]);

            return response()->json([
                'todo' => $todo
            ]);

           
            // return redirect(route("todo.home"));
        }
    
    public function delete($id){
        $todo = ToDoModel::find($id);
        if ($todo) {
            $todo->delete();
            return response()->json(['message' => 'Todo deleted successfully']);
        } else {
            return response()->json(['message' => 'Todo not found'], 404);
        }
    }

    // public function edit($id){
    //     $todo=ToDoModel::find($id);
    //     $data=compact('todo');
    //     return view("update")->with($data);
    // }

    public function updateData(Request $request, $id){
        
        $request->validate(
            [
                'name' => 'required',
                'work' => 'required',
                'due_date' => 'required'
            ]

        );

        // dd($request->all());

        $todo = ToDoModel::find($id);

        if ($todo) {
            $todo->name = $request->input('name');
            $todo->work = $request->input('work');
            $todo->due_date = $request->input('due_date');
            $todo->save();

            return response()->json([
                'message' => 'Todo updated successfully',
                'todo' => $todo
            ]);

            // return redirect(route("todo.home"));
        } else {
            return response()->json(['message' => 'Todo not found'], 404);
        }
    }
}