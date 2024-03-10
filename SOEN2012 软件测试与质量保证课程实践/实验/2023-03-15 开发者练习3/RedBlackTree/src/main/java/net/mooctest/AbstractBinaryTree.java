package net.mooctest;

@SuppressWarnings("java:S106")
public abstract class AbstractBinaryTree {

	/** Root node where whole tree starts. */
	public Node root;

	/** Tree size. */
	protected int size;

	/**
	 * Because this is abstract class and various trees have different additional
	 * information on different nodes subclasses uses this abstract method to create
	 * nodes (maybe of class {@link Node} or maybe some different node sub class).
	 * 
	 * @param value
	 *               Value that node will have.
	 * @param parent
	 *               Node's parent.
	 * @param left
	 *               Node's left child.
	 * @param right
	 *               Node's right child.
	 * @return Created node instance.
	 */
	protected abstract Node createNode(int value, Node parent, Node left, Node right);

	/**
	 * Finds a node with concrete value. If it is not found then null is returned.
	 * 
	 * @param element
	 *                Element value.
	 * @return Node with value provided, or null if not found.
	 */
	public Node search(int element) {
		Node node = root;
		while (node != null && node.value != null && node.value != element) {
			if (element < node.value) {
				node = node.left;
			} else {
				node = node.right;
			}
		}
		return node;
	}

	/**
	 * Insert new element to tree.
	 * 
	 * @param element
	 *                Element to insert.
	 */
	public Node insert(int element) {
		if (root == null) {
			root = createNode(element, null, null, null);
			size++;
			return root;
		}

		Node insertParentNode = null;
		Node searchTempNode = root;
		while (searchTempNode != null && searchTempNode.value != null) {
			insertParentNode = searchTempNode;
			if (element < searchTempNode.value) {
				searchTempNode = searchTempNode.left;
			} else {
				searchTempNode = searchTempNode.right;
			}
		}

		Node newNode = createNode(element, insertParentNode, null, null);
		if (insertParentNode.value > newNode.value) {
			insertParentNode.left = newNode;
		} else {
			insertParentNode.right = newNode;
		}

		size++;
		return newNode;
	}

	/**
	 * Removes element if node with such value exists.
	 * 
	 * @param element
	 *                Element value to remove.
	 * 
	 * @return New node that is in place of deleted node. Or null if element for
	 *         delete was not found.
	 */
	public Node delete(int element) {
		Node deleteNode = search(element);
		if (deleteNode != null) {
			return delete(deleteNode);
		} else {
			return null;
		}
	}

	/**
	 * Delete logic when node is already found.
	 * 
	 * @param deleteNode
	 *                   Node that needs to be deleted.
	 * 
	 * @return New node that is in place of deleted node. Or null if element for
	 *         delete was not found.
	 */
	protected Node delete(Node deleteNode) {
		if (deleteNode != null) {
			Node nodeToReturn = null;

			if (deleteNode.left == null) {
				nodeToReturn = transplant(deleteNode, deleteNode.right);
			} else if (deleteNode.right == null) {
				nodeToReturn = transplant(deleteNode, deleteNode.left);
			} else {
				Node successorNode = getMinimum(deleteNode.right);
				if (successorNode.parent != deleteNode) {
					transplant(successorNode, successorNode.right);
					successorNode.right = deleteNode.right;
					successorNode.right.parent = successorNode;
				}
				transplant(deleteNode, successorNode);
				successorNode.left = deleteNode.left;
				successorNode.left.parent = successorNode;
				nodeToReturn = successorNode;
			}
			size--;

			return nodeToReturn;
		}
		return null;
	}

	/**
	 * Put one node from tree (newNode) to the place of another (nodeToReplace).
	 * 
	 * @param nodeToReplace
	 *                      Node which is replaced by newNode and removed from tree.
	 * @param newNode
	 *                      New node.
	 * 
	 * @return New replaced node.
	 */
	private Node transplant(Node nodeToReplace, Node newNode) {
		if (nodeToReplace.parent == null) {
			this.root = newNode;
		} else if (nodeToReplace == nodeToReplace.parent.left) {
			nodeToReplace.parent.left = newNode;
		} else {
			nodeToReplace.parent.right = newNode;
		}
		if (newNode != null) {
			newNode.parent = nodeToReplace.parent;
		}
		return newNode;
	}

	/**
	 * @param element
	 * @return true if tree contains element.
	 */
	public boolean contains(int element) {
		return search(element) != null;
	}

	/**
	 * @return Minimum element in tree.
	 */
	public int getMinimum() {
		return getMinimum(root).value;
	}

	/**
	 * @return Maximum element in tree.
	 */
	public int getMaximum() {
		return getMaximum(root).value;
	}

	/**
	 * Get next element element who is bigger than provided element.
	 * 
	 * @param element
	 *                Element for whom descendand element is searched
	 * @return Successor value.
	 */
	// TODO Predecessor
	public int getSuccessor(int element) {
		return getSuccessor(search(element)).value;
	}

	/**
	 * @return Number of elements in the tree.
	 */
	public int getSize() {
		return size;
	}

	/**
	 * Tree traversal with printing element values. In order method.
	 */
	public void printTreeInOrder() {
		printTreeInOrder(root);
	}

	/**
	 * Tree traversal with printing element values. Pre order method.
	 */
	public void printTreePreOrder() {
		printTreePreOrder(root);
	}

	/**
	 * Tree traversal with printing element values. Post order method.
	 */
	public void printTreePostOrder() {
		printTreePostOrder(root);
	}

	/*-------------------PRIVATE HELPER METHODS-------------------*/

	private void printTreeInOrder(Node entry) {
		if (entry != null) {
			printTreeInOrder(entry.left);
			if (entry.value != null) {
				System.out.println(entry.value);
			}
			printTreeInOrder(entry.right);
		}
	}

	private void printTreePreOrder(Node entry) {
		if (entry != null) {
			if (entry.value != null) {
				System.out.println(entry.value);
			}
			printTreeInOrder(entry.left);
			printTreeInOrder(entry.right);
		}
	}

	private void printTreePostOrder(Node entry) {
		if (entry != null) {
			printTreeInOrder(entry.left);
			printTreeInOrder(entry.right);
			if (entry.value != null) {
				System.out.println(entry.value);
			}
		}
	}

	protected Node getMinimum(Node node) {
		while (node.left != null) {
			node = node.left;
		}
		return node;
	}

	protected Node getMaximum(Node node) {
		while (node.right != null) {
			node = node.right;
		}
		return node;
	}

	protected Node getSuccessor(Node node) {
		// if there is right branch, then successor is leftmost node of that
		// subtree
		if (node.right != null) {
			return getMinimum(node.right);
		} else {
			// otherwise it is a lowest ancestor whose left child is also
			// ancestor of node
			Node currentNode = node;
			Node parentNode = node.parent;
			while (parentNode != null && currentNode == parentNode.right) {
				// go up until we find parent that currentNode is not in right
				// subtree.
				currentNode = parentNode;
				parentNode = parentNode.parent;
			}
			return parentNode;
		}
	}

	public void printTree() {
		printSubtree(root);
	}

	public void printSubtree(Node node) {
		if (node.right != null) {
			printTree(node.right, true, "");
		}
		printNodeValue(node);
		if (node.left != null) {
			printTree(node.left, false, "");
		}
	}

	private void printNodeValue(Node node) {
		if (node.value == null) {
			System.out.print("<null>");
		} else {
			System.out.print(node.value.toString());
		}
		System.out.println();
	}

	private void printTree(Node node, boolean isRight, String indent) {
		if (node.right != null) {
			printTree(node.right, true, indent + (isRight ? "        " : " |      "));
		}
		System.out.print(indent);
		if (isRight) {
			System.out.print(" /");
		} else {
			System.out.print(" \\");
		}
		System.out.print("----- ");
		printNodeValue(node);
		if (node.left != null) {
			printTree(node.left, false, indent + (isRight ? " |      " : "        "));
		}
	}

	/**
	 * Rotate to the left.
	 * 
	 * @param node
	 *             Node on which to rotate.
	 * @return Node that is in place of provided node after rotation.
	 */
	protected Node rotateLeft(Node node) {
		Node temp = node.right;
		temp.parent = node.parent;

		node.right = temp.left;
		if (node.right != null) {
			node.right.parent = node;
		}

		temp.left = node;
		node.parent = temp;

		// temp took over node's place so now its parent should point to temp
		if (temp.parent != null) {
			if (node == temp.parent.left) {
				temp.parent.left = temp;
			} else {
				temp.parent.right = temp;
			}
		} else {
			root = temp;
		}

		return temp;
	}

	/**
	 * Rotate to the right.
	 * 
	 * @param node
	 *             Node on which to rotate.
	 * @return Node that is in place of provided node after rotation.
	 */
	protected Node rotateRight(Node node) {
		Node temp = node.left;
		temp.parent = node.parent;

		node.left = temp.right;
		if (node.left != null) {
			node.left.parent = node;
		}

		temp.right = node;
		node.parent = temp;

		// temp took over node's place so now its parent should point to temp
		if (temp.parent != null) {
			if (node == temp.parent.left) {
				temp.parent.left = temp;
			} else {
				temp.parent.right = temp;
			}
		} else {
			root = temp;
		}

		return temp;
	}

}
